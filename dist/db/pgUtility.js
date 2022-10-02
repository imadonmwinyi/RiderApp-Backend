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
exports.insertValues = exports.buildAliasMapper = exports.isUniqueErr = exports.getConnect = exports.query = exports.queryRow = void 0;
const connection_1 = require("../db/connection");
const queryRow = (sql, values, tx) => __awaiter(void 0, void 0, void 0, function* () {
    // Get connection from PG Pool or use passed connection, will be explained below
    const client = yield (0, exports.getConnect)(tx);
    // I think will be better to separate handling query with passed values 
    if (Array.isArray(values)) {
        try {
            const res = yield client.query(sql, values);
            return res.rows[0];
        }
        catch (e) {
            throw e;
        }
        finally {
            // if we not have passed connection, we need close opened connection
            if (!tx)
                client.release();
        }
    }
    try {
        const res = yield client.query(sql);
        return res.rows[0];
    }
    catch (e) {
        throw e;
    }
    finally {
        if (!tx)
            client.release();
    }
});
exports.queryRow = queryRow;
const query = (sql, values, tx) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, exports.getConnect)(tx);
    if (Array.isArray(values)) {
        try {
            const res = yield client.query(sql, values);
            return res.rows;
        }
        catch (e) {
            throw e;
        }
        finally {
            if (!tx)
                client.release();
        }
    }
    try {
        const res = yield client.query(sql);
        return res.rows;
    }
    catch (e) {
        throw e;
    }
    finally {
        if (!tx)
            client.release();
    }
});
exports.query = query;
const getConnect = (tx) => {
    if (tx) {
        return tx;
    }
    // pool it is global connection variable
    // !!! Warning !!!
    // Be very-very carefully when working with global variables
    // And you should not access this variable from business logic
    return connection_1.pool.connect();
};
exports.getConnect = getConnect;
const isUniqueErr = (error, table) => {
    if (table) {
        // 23505 it is one of PostgreSQL error codes, what mean it is unique error
        // Read more here: https://www.postgresql.org/docs/14/errcodes-appendix.html
        return error.code === '23505' && error.severity === 'ERROR' && error.table === table;
    }
    return error.code === '23505' && error.severity === 'ERROR';
};
exports.isUniqueErr = isUniqueErr;
function buildAliasMapper(obj) {
    // use ES6 Map structure for performance reasons
    // More here: https://www.measurethat.net/Benchmarks/Show/11290/4/map-vs-object-real-world-performance
    const _mapper = new Map();
    for (const [key, value] of Object.entries(obj)) {
        // Create mapping 
        // JS representation property name to PostgreSQL column name
        _mapper.set(key, typeof value === 'string'
            ? value
            : value.name);
    }
    // And return function what will get JS key and output PostgreSQL column name
    return (col) => `"${_mapper.get(col)}"`;
}
exports.buildAliasMapper = buildAliasMapper;
const insertValues = (values) => values.map((_, index) => `$${index + 1}`).join(', ');
exports.insertValues = insertValues;
//# sourceMappingURL=pgUtility.js.map