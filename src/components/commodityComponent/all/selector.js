import { createSelector } from 'reselect'


// 获取系列列表
const getCommList = (commList,brandId,seriesId,typeId,uniteId,price,sort,desc,flag) => commList;
const getBrandId = (commList,brandId,seriesId,typeId,uniteId,price,sort,desc,flag) => brandId;
const getSeriesId = (commList,brandId,seriesId,typeId,uniteId,price,sort,desc,flag) => seriesId;
const getTypeId = (commList,brandId,seriesId,typeId,uniteId,price,sort,desc,flag) => typeId;
const getUniteId = (commList,brandId,seriesId,typeId,uniteId,price,sort,desc,flag) => uniteId;
const getPrice = (commList,brandId,seriesId,typeId,uniteId,price,sort,desc,flag) => price;
const getSort = (commList,brandId,seriesId,typeId,uniteId,price,sort,desc,flag) => sort;
const getDesc = (commList,brandId,seriesId,typeId,uniteId,price,sort,desc,flag) => desc;
const getFlag = (commList,brandId,seriesId,typeId,uniteId,price,sort,desc,flag) => flag;


// flag为强制触发

export const getCommListByFilter = createSelector(
    [ getCommList, getBrandId,getSeriesId,getTypeId,getUniteId,getPrice,getSort,getDesc,getFlag],
    (commList, brandId,seriesId,typeId,uniteId,price,sort,desc,flag) => {

        let result = commList.filter(item=>{
            const brandFlag = brandId===undefined?(true):(item.brandId===brandId);
            const seriesFlag = seriesId===undefined?(true):(item.seriesId===seriesId);
            const typeFlag = typeId===undefined?(true):(
                item.typeId.indexOf(typeId) !== -1
            );
            const uniteFlag = uniteId===undefined?(true):(
                item.uniteId.indexOf(uniteId) !== -1
            );
            const priceFlag = price===undefined?(true):(Math.min.apply(null, item.price)<=price);
            return brandFlag&&seriesFlag&&typeFlag&&uniteFlag&&priceFlag;
        });
        if(desc){
            return result.sort(compareDesc(sort));
        }else{
            return result.sort(compareAsc(sort));
        }
    }
);



let compareDesc = function (prop) {
    return function (obj1, obj2) {
        if(Array.isArray(obj1[prop])){
            let val1 = Math.min.apply(null, obj1[prop]);
            let val2 = Math.min.apply(null, obj2[prop]);
            if (val1 > val2) {
                return -1;
            } else if (val1 < val2) {
                return 1;
            } else {
                return 0;
            }
        }else{
            let val1 = obj1[prop];
            let val2 = obj2[prop];
            if (val1 > val2) {
                return -1;
            } else if (val1 < val2) {
                return 1;
            } else {
                return 0;
            }
        }
    }
};

let compareAsc = function (prop) {
    return function (obj1, obj2) {
        if(Array.isArray(obj1[prop])){
            let val1 = Math.min.apply(null, obj1[prop]);
            let val2 = Math.min.apply(null, obj2[prop]);
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        }else{
            let val1 = obj1[prop];
            let val2 = obj2[prop];
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        }
    }
};
// let compareDesc = function (prop) {
//     return function (obj1, obj2) {
//         let val1 = obj1[prop];
//         let val2 = obj2[prop];
//         if (val1 > val2) {
//             return -1;
//         } else if (val1 < val2) {
//             return 1;
//         } else {
//             return 0;
//         }
//     }
// };
//
// let compareAsc = function (prop) {
//     return function (obj1, obj2) {
//         let val1 = obj1[prop];
//         let val2 = obj2[prop];
//         if (val1 < val2) {
//             return -1;
//         } else if (val1 > val2) {
//             return 1;
//         } else {
//             return 0;
//         }
//     }
// };