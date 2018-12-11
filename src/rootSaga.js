import { fork} from "redux-saga/effects";
import * as loginSaga from "./containers/login/saga";
import * as navSaga from "./components/shareComponents/navLink/saga";
import * as highSaga from "./containers/high/saga";
import * as allSaga from "./containers/all/saga";
import * as orderSaga from "./containers/order/saga";
import * as commSaga from "./containers/commodity/saga";
import * as userSaga from "./containers/user/saga";
import * as personSaga from "./containers/person/saga";

function* rootSaga() {
    /*The saga is waiting for a action called LOAD_DASHBOARD to be activated */
    yield [
        fork(loginSaga.watchLoginSaga), // 登录
        fork(navSaga.watchSaveInfo), // 保存登录信息
        fork(navSaga.watchAuthJwt), // 验证jwt令牌
        fork(highSaga.watchFetchManagersSaga), // 获取管理员列表
        fork(highSaga.watchDelManagerSaga), // 删除管理员
        fork(highSaga.watchForbidManagerSaga), // 禁用管理员
        fork(highSaga.watchCancelForbidManagerSaga), // 取消禁用管理员
        fork(highSaga.watchFetchAuthListSaga), // 获取权限列表
        fork(highSaga.watchUpdateManagerSaga), // 更新管理员信息
        fork(highSaga.watchAddManagerSaga), // 添加管理员信息

        fork(highSaga.watchAddAuthSaga), // 添加权限信息
        fork(highSaga.watchDelAuthSaga), // 删除权限
        fork(highSaga.watchUpdateAuthSaga), // 更新权限信息

        fork(highSaga.watchFetchLogListSaga), // 获取日志列表

        fork(allSaga.watchFetchAfterSaleSaga), // 获取售后列表
        fork(allSaga.watchFetchCommoditiesSaga), // 获取商品列表
        fork(allSaga.watchFetchKeyWordsSaga), // 获取搜索列表
        fork(allSaga.watchFetchOrdersSaga), // 获取订单列表
        fork(allSaga.watchFetchVisitSaga), // 获取访问列表

        fork(orderSaga.watchFetchPaysSaga), // 获取未付款订单列表
        fork(orderSaga.watchDeletePaysSaga), // 删除未付款订单列表
        fork(orderSaga.watchUpdatePriceSaga), // 改价未付款订单

        fork(orderSaga.watchDeleteDeliversSaga), // 删除代发货订单列表
        fork(orderSaga.watchDeliverSaga), // 发货
        fork(orderSaga.watchFetchDeliversSaga), // 获取待付款订单列表
        fork(orderSaga.watchFetchExpressSaga), // 获取物流列表
        fork(orderSaga.watchFetchExcelSaga), // 获取未发货表格


        fork(orderSaga.watchDeleteTakeOrdersSaga), // 删除代收货订单列表
        fork(orderSaga.watchFetchTakeExpressSaga), // 获取物流列表
        fork(orderSaga.watchFetchTakeOrdersSaga), // 获取待收货订单列表
        fork(orderSaga.watchUpdateDeliverSaga), // 更新待收货物流信息

        fork(orderSaga.watchFetchDoneOrdersSaga), // 获取已完成订单列表
        fork(orderSaga.watchDeleteDoneOrdersSaga), // 删除已完成物流信息

        fork(orderSaga.watchFetchAfterSalesSaga), // 获取售后列表
        fork(orderSaga.watchDeleteDoneAfterSalesSaga), // 删除售后
        fork(orderSaga.watchAgreeAfterSalesSaga), // 同意售后
        fork(orderSaga.watchDisAgreeAfterSalesSaga), // 拒绝售后
        fork(orderSaga.watchCloseAfterSalesSaga), // 关闭售后

        fork(commSaga.watchAddCommoditySaga), // 添加商品
        fork(commSaga.watchDeleteCommoditySaga), // 删除商品
        fork(commSaga.watchUpdateCommoditySaga), // 更新商品

        fork(commSaga.watchReplySaga), // 回复评论
        fork(commSaga.watchDeleteCommentsSaga), // 删除新增评论

        fork(commSaga.watchAddBrandSaga), // 添加品牌
        fork(commSaga.watchDeleteBrandSaga), // 删除品牌
        fork(commSaga.watchUpdateBrandSaga), // 更新品牌

        fork(commSaga.watchAddUniteSaga), // 添加联名
        fork(commSaga.watchDeleteUniteSaga), // 删除联名
        fork(commSaga.watchUpdateUniteSaga), // 更新联名

        fork(commSaga.watchAddSeriesSaga), // 添加系列
        fork(commSaga.watchDeleteSeriesSaga), // 删除系列
        fork(commSaga.watchUpdateSeriesSaga), // 更新系列

        fork(commSaga.watchAddTypeSaga), // 添加类型
        fork(commSaga.watchDeleteTypeSaga), // 删除类型
        fork(commSaga.watchUpdateTypeSaga), // 更新类型

        fork(commSaga.watchAddQualitySaga), // 添加品质
        fork(commSaga.watchDeleteQualitySaga), // 删除品质
        fork(commSaga.watchUpdateQualitySaga), // 更新品质

        fork(commSaga.watchAddSizeSaga), // 添加尺码
        fork(commSaga.watchDeleteSizeSaga), // 删除尺码
        fork(commSaga.watchUpdateSizeSaga), // 更新尺码

        fork(commSaga.watchAddExpressSaga), // 添加快递
        fork(commSaga.watchDeleteExpressSaga), // 删除快递
        fork(commSaga.watchUpdateExpressSaga), // 更新快递

        fork(commSaga.watchAddDiscountSaga), // 添加代金卷
        fork(commSaga.watchDeleteDiscountSaga), // 删除代金卷
        fork(commSaga.watchUpdateDiscountSaga), // 更新代金卷

        fork(commSaga.watchUpdateHomeSaga), // 更新主页信息

        fork(userSaga.watchDeleteUserSaga), // 删除用户
        fork(userSaga.watchDiscountUserSaga), // 代金卷设置

        fork(personSaga.watchUpdateManagerInfoSaga), // 更新个人信息
    ];
}
export default rootSaga;