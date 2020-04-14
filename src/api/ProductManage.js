import { get, post } from './http'

export const GetDbControlInfo = p => get('/Utmel/Product/GetProduct', p);   //分页获取数据库库存信息 

export const GetMongoDbControlInfo = p => get('/Utmel/Product/GetMfgPart', p);   //分页获取MongoDb库存信息 

export const GetMongoDbCount = p => get('/Utmel/Product/GetProCount', p);   //分页获取MongoDb库存总数

export const GetAttributeByMFG = p => get('/Utmel/Product/GetAttributeByMFG', p);   //根据制造商型号获取属性集合

export const EditAttributeById = p => post('/Utmel/Product/EditAttributeById', p);   //根据Id编辑产品属性

export const GetParentCategory = p => get('/Utmel/Product/GetParentCategory', p);   //获取父级分类

export const GetChildCategory = p => get('/Utmel/Product/GetChildCategory?'+p );   //获取子级分类

export const EditProCategory = p => post('/Utmel/Product/EditProCategory', p);   //编辑产品分类

export const GetMfg = p => get('/Utmel/Product/GetMfg', p);   //获取制造商信息

export const EditMfg = p => post('/Utmel/Product/EditMfg', p);//编辑产品制造商


export const GetManufacturer = p => get('/Utmel/Manufacturer/GetManufacturer', p);//分页获取数据库品牌信息

export const DelBrands = p => post('/Utmel/Manufacturer/DelManufacturer?manufacturer='+p );//删除品牌

export const EditBrands = p => post('/Utmel/Manufacturer/EditManufacturer', p);//编辑品牌

export const AddBrands = p => post('/Utmel/Manufacturer/AddManufacturer?manufacturer='+p );//新增品牌

export const GetMFGOctopart = p => get('/Utmel/Manufacturer/GetMFGOctopart', p);//分页获取别名



export const GetAttrList = p => get('/Utmel/Attribute/GetAttStandardName', p);//分页获取属性

export const EditAttrList = p => post('/Utmel/Attribute/EditAttStandardName', p);//编辑属性

export const DelectAttrList = p => post('/Utmel/Attribute/DelAttStandardName?attribute_StandardName='+p );//删除属性


export const GetClassLists = p => get('/Utmel/Category/GetCategoryOctopart', p);//分页获取分类


export const GetCategoryById = p => get('/Utmel/Category/GetCategoryById', p);//分页获取数据库分类信息取父级名称 




