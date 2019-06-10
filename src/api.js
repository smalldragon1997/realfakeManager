import axios from 'axios';

export const login = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/manager/superInfo', {
        axios.post('/api/v1/security/managers/login', data)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const logout = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/manager/superInfo', {
        axios.delete('/api/v1/security/managers/login/' + data.manId, {
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const updatePwd = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/manager/superInfo', {
        axios.put('/api/v1/security/managers/login/' + data.manId,data, {
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const loginWithJwt = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/manager/superInfo', {
        axios.post('/api/v1/security/managers/token', data, {
                headers: {"Content-type": "application/x-www-form-urlencoded"},
                params: data
            })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const updateMangerInfo = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/manager/superInfo', {
        axios.put('/api/v1/managers/' + data.manId, data, {
                headers: {"Authorization": "bearer " + data.jwt}
            })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const addManager = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/manager/superInfo', {
        axios.post('/api/v1/manager', data, {
            headers: {"Authorization": "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchManagers = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/managers',{
        axios.get('/api/v1/managers', {
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const fetchManager = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/managers',{
        axios.get('/api/v1/managers/'+data.manId, {
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const forbidManager = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/managers',{
        axios.put('/api/v1/managers/disable', data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const enableManager = (data) => {
    return new Promise(function (resolve, reject) {
        // axios.get('/mock/managers',{
        axios.put('/api/v1/managers/enable', data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchAuthList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/security/permissions', {
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchAuthInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/security/permissions/'+data.authId, {
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateAuth = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/security/permissions/'+data.authId, data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchLogList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/security/logs', {
            headers: {Authorization: "bearer " + data.jwt},
            params:data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchOrdersList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/orders', {
            auth: data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchVisit = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/visit', {
            auth: data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchAfterSale = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/afterSale', {
            auth: data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchCommodityList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/commodities', {
            params: data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchCommodityInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/commodities/'+data.commId, {
            params: data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateCommodityInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/commodities/'+data.commId, data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const addCommodityInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.post('/api/v1/commodity', data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteCommodityInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.delete('/api/v1/commodities/'+data.commId,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchBrandList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/brands')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchSeriesList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/series')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchTypeList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/types')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchUniteList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/unites')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchQualityList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/qualities')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchSizeList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/sizes')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchExpressList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/expresses')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchDiscountList = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/discounts')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteBrand = (data) => {
    return new Promise(function (resolve, reject) {
        axios.delete('/api/v1/categories/brands/'+data.brandId,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateBrand = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/categories/brands/'+data.brandId,data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const addBrand = (data) => {
    return new Promise(function (resolve, reject) {
        axios.post('/api/v1/categories/brand',data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchBrandInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/brands/'+data.brandId)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateHomeInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/categories/home',data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchHomeInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/home')
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchUniteInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/unites/'+data.uniteId)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteUnite = (data) => {
    return new Promise(function (resolve, reject) {
        axios.delete('/api/v1/categories/unites/'+data.uniteId,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const addUnite = (data) => {
    return new Promise(function (resolve, reject) {
        axios.post('/api/v1/categories/unite',data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateUnite = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/categories/unites/'+data.uniteId,data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchSeriesInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/series/'+data.seriesId)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteSeries = (data) => {
    return new Promise(function (resolve, reject) {
        axios.delete('/api/v1/categories/series/'+data.seriesId,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const addSeries = (data) => {
    return new Promise(function (resolve, reject) {
        axios.post('/api/v1/categories/series',data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateSeries = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/categories/series/'+data.seriesId,data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchTypeInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/types/'+data.typeId)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteType = (data) => {
    return new Promise(function (resolve, reject) {
        axios.delete('/api/v1/categories/types/'+data.typeId,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const addType = (data) => {
    return new Promise(function (resolve, reject) {
        axios.post('/api/v1/categories/type',data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateTypeInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/categories/types/'+data.typeId,data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchQualityInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/qualities/'+data.qualityId)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteQuality = (data) => {
    return new Promise(function (resolve, reject) {
        axios.delete('/api/v1/categories/qualities/'+data.qualityId,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const addQuality = (data) => {
    return new Promise(function (resolve, reject) {
        axios.post('/api/v1/categories/quality',data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateQualityInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/categories/qualities/'+data.qualityId,data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchSizeInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/sizes/'+data.sizeId)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteSize = (data) => {
    return new Promise(function (resolve, reject) {
        axios.delete('/api/v1/categories/sizes/'+data.sizeId,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const addSize = (data) => {
    return new Promise(function (resolve, reject) {
        axios.post('/api/v1/categories/size',data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateSizeInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/categories/sizes/'+data.sizeId,data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchDiscountInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/discounts/'+data.disId)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteDiscount = (data) => {
    return new Promise(function (resolve, reject) {
        axios.delete('/api/v1/categories/discounts/'+data.disId,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const addDiscount = (data) => {
    return new Promise(function (resolve, reject) {
        axios.post('/api/v1/categories/discount',data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateDiscountInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/categories/discounts/'+data.disId,data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchExpressInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/categories/expresses/'+data.expId)
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteExpress = (data) => {
    return new Promise(function (resolve, reject) {
        axios.delete('/api/v1/categories/expresses/'+data.expId,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const addExpress = (data) => {
    return new Promise(function (resolve, reject) {
        axios.post('/api/v1/categories/express',data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateExpressInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/categories/expresses/'+data.expId,data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchKeyWords = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/keyWords', {
            auth: data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const updateOrder = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/orders/'+data.orderId, data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const fetchOrders = (data) => {
    console.log(data)
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/orders', {
            params:data,
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchOrderInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/orders/'+data.orderId, {
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const deleteOrder = (data) => {
    return new Promise(function (resolve, reject) {
        axios.delete('/api/v1/orders/'+data.orderId,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const updatePrice = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/orders/'+data.orderId, data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const fetchExpress = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/express', {
            auth: data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};
export const fetchAfterSales = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/afterSales', {
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};



export const updateAfterSaleInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.put('/api/v1/afterSales/'+data.aftId, data,{
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};


export const fetchAfterSaleInfo = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/api/v1/afterSales/'+data.aftId, {
            headers: {Authorization: "bearer " + data.jwt}
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};

export const fetchExcel = (data) => {
    return new Promise(function (resolve, reject) {
        axios.get('/mock/manager/excel', {
            auth: data
        })
            .then(function (res) {
                // 正确返回信息 将返回信息传回
                resolve(res);
            }).catch(function (error) {
            // 返回错误信息
            reject(error);
        });
    });
};






