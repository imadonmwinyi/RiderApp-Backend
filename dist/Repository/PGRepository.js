"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PGRepository = void 0;
const pgUtility_1 = require("../db/pgUtility");
const pgUtility_2 = require("../db/pgUtility");
class PGRepository {
    constructor({ pool, table, mapping, 
    // variable for storing id/primaryKey, for situations when out 'id' columns have name like 'postId'.
    // by default we think what primaryKey is 'id'
    primaryKey = 'id', }) {
        const aliasMapper = (0, pgUtility_1.buildAliasMapper)(mapping);
        this.pool = pool;
        this.table = `"${table}"`;
        this.columnAlias = aliasMapper;
        this.primaryKey = primaryKey;
        // select SQL-generator for only specific columns
        // example payload: ['createdAt']
        // output: '"created_at" as "createdAt"'
        this.cols = (...args) => args.map(key => `${aliasMapper(key)} AS "${key}"`).join(', ');
        // Almost the same as this.cols, only predefined and for all columns except hidden columns
        this.allColumns = Object.entries(mapping).reduce((acc, [key, value]) => {
            if (typeof value === 'object' && value.hidden) {
                return acc;
            }
            const sql = `${aliasMapper(key)} AS "${key}"`;
            return acc
                ? acc += `, ${sql}`
                : sql;
        }, '');
        // SQL-generator for WHERE clause
        this.where = (values, initialIndex = 0) => {
            const sql = Object.keys(values).reduce((acc, key, index) => {
                const condition = `${aliasMapper(key)} = $${index + initialIndex + 1}`;
                return acc === ''
                    ? `${acc} ${condition}`
                    : `${acc}AND ${condition}`;
            }, '');
            return `WHERE ${sql}`;
        };
    }
    create(value, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const _cols = [];
            const _values = [];
            for (const key of Object.keys(value)) {
                _cols.push(this.columnAlias(key));
                _values.push(value[key]);
            }
            const cols = _cols.join(', ');
            const values = (0, pgUtility_1.insertValues)(_values);
            const row = yield (0, pgUtility_2.queryRow)(`INSERT INTO ${this.table} (${cols}) VALUES (${values}) RETURNING ${this.allColumns}`, _values, tx);
            return row;
        });
    }
    createMany(values, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const _cols = [];
            const _values = [];
            for (const value of values) {
                const keys = Object.keys(value);
                for (const key of keys) {
                    if (_cols.length !== keys.length)
                        _cols.push(this.columnAlias(key));
                    _values.push(value[key]);
                }
            }
            const cols = _cols.join(', ');
            const inlinedValues = values
                .map((_, index) => `(${_cols.map((_, cIndex) => {
                const offset = index !== 0
                    ? _cols.length * index
                    : 0;
                return `$${cIndex + 1 + offset}`;
            })})`)
                .join(', ');
            const rows = yield (0, pgUtility_1.query)(`
        INSERT INTO ${this.table} (${cols})
        VALUES ${inlinedValues}
        RETURNING ${this.allColumns}
      `, _values, tx);
            return rows;
        });
    }
    update(id, newValue, tx) {
        const sqlSet = Object.keys(newValue).reduce((acc, key, index) => {
            const sql = `${this.columnAlias(key)} = $${index + 2}`;
            return acc !== ''
                ? `${acc}, ${sql}`
                : sql;
        }, '');
        return (0, pgUtility_2.queryRow)(`UPDATE ${this.table} SET ${sqlSet} WHERE "${this.primaryKey}" = $1 RETURNING ${this.allColumns}`, [id, ...Object.values(newValue)], tx);
    }
    delete(id, tx) {
        return (0, pgUtility_2.queryRow)(`DELETE FROM ${this.table} WHERE "${this.primaryKey}" = $1`, [id], tx);
    }
    find(value, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const cols = options.select
                ? this.cols(...options.select)
                : this.allColumns;
            const sql = `SELECT ${cols} FROM ${this.table} ${this.where(value)}`;
            const res = yield (0, pgUtility_1.query)(sql, Object.values(value), options.tx);
            return res;
        });
    }
    findOne(id, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPrimitive = typeof id !== 'object';
            const cols = options.select
                ? this.cols(...options.select)
                : this.allColumns;
            const values = isPrimitive
                ? [id]
                : Object.values(id);
            let sql = `SELECT ${cols} FROM ${this.table}`;
            if (isPrimitive) {
                sql += ` WHERE "${this.primaryKey}" = $1`;
            }
            else {
                sql += ` ${this.where(id)}`;
            }
            const res = yield (0, pgUtility_2.queryRow)(sql, values, options.tx);
            return res;
        });
    }
    exist(id, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT COUNT(*)::integer as count FROM ${this.table}`;
            const isPrimitive = typeof id !== 'object';
            const values = isPrimitive
                ? [id]
                : Object.values(id);
            if (isPrimitive) {
                sql += ` WHERE "${this.primaryKey}" = $1`;
            }
            else {
                sql += ` ${this.where(id)}`;
            }
            sql += ' LIMIT 1';
            const res = yield (0, pgUtility_2.queryRow)(sql, values, tx);
            return res.count !== 0;
        });
    }
}
exports.PGRepository = PGRepository;
//# sourceMappingURL=PGRepository.js.map