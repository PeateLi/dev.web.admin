import { get, post } from './http'

export const login = p => post('/Utmel/Login/DevLogin'+p);   //登录