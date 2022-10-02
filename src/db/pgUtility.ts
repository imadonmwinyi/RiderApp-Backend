import { pool } from '../db/connection';
import { PoolClient } from 'pg';
import { ColumnData, AnyObject } from './dbType';


export const queryRow = async <T = any>(sql: string, values: any[] | null, tx?: PoolClient): Promise<T> => {
    // Get connection from PG Pool or use passed connection, will be explained below
    const client = await getConnect(tx)
  
    // I think will be better to separate handling query with passed values 
    if (Array.isArray(values)) {
      try {
        const res = await client.query(sql, values)
  
        return res.rows[0] as T
      } catch (e) {
        throw e
      } finally {
        // if we not have passed connection, we need close opened connection
        if (!tx) client.release()
      }
    }
  
    try {
      const res = await client.query(sql)
  
      return res.rows[0] as T
    } catch (e) {
      throw e
    } finally {
      if (!tx) client.release()
    }
  }




  export const query = async <T = any>(sql: string, values?: any[] | null, tx?: PoolClient) => {
    const client = await getConnect(tx)
  
    if (Array.isArray(values)) {
      try {
        const res = await client.query(sql, values)
  
        return res.rows as T[]
      } catch (e) {
        throw e
      } finally {
        if (!tx) client.release()
      }
    }
  
    try {
      const res = await client.query(sql)
  
      return res.rows as T[]
    } catch (e) {
      throw e
    } finally {
      if (!tx) client.release()
    }
  }



  export const getConnect = (tx?: PoolClient): Promise<PoolClient> => {
    if (tx) {
      return tx as unknown as Promise<PoolClient>
    }
    // pool it is global connection variable
    // !!! Warning !!!
    // Be very-very carefully when working with global variables
    // And you should not access this variable from business logic
    return pool.connect()
  }

  export const isUniqueErr = (error: any, table?: string) => {
    if (table) {
      // 23505 it is one of PostgreSQL error codes, what mean it is unique error
      // Read more here: https://www.postgresql.org/docs/14/errcodes-appendix.html
      return error.code === '23505' && error.severity === 'ERROR' && error.table === table
    }
  
    return error.code === '23505' && error.severity === 'ERROR'
  }

  
export function buildAliasMapper<T extends AnyObject>(obj: Record<keyof T, ColumnData>) {
    // use ES6 Map structure for performance reasons
    // More here: https://www.measurethat.net/Benchmarks/Show/11290/4/map-vs-object-real-world-performance
    const _mapper = new Map<keyof T, string>()
  
    for (const [key, value] of Object.entries(obj)) {
      // Create mapping 
      // JS representation property name to PostgreSQL column name
      _mapper.set(key, typeof value === 'string'
        ? value
        : value.name)
    }
  
    // And return function what will get JS key and output PostgreSQL column name
    return (col: keyof T): string => `"${_mapper.get(col)!}"`
  }
  
  export const insertValues = (values: any[]) => values.map((_, index) => `$${index + 1}`).join(', ')