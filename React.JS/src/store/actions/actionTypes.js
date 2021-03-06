const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',

    // ADmin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',
     // STATUS
    FETCH_STATUS_START: 'FETCH_STATUS_START',
    FETCH_STATUS_SUCCESS: 'FETCH_STATUS_SUCCESS',
    FETCH_STATUS_FAILED: 'FETCH_STATUS_FAILED',

    // ROLE
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAIL',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAIL',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAIL',

    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAILED: 'FETCH_ALL_USER_FAILED',

    FETCH_TOP_DT_SUCCESS: 'FETCH_TOP_DT_SUCCESS',
    FETCH_TOP_DT_FAILED: 'FETCH_TOP_DT_FAILED',

    FETCH_ALL_SP_SUCCESS: 'FETCH_ALL_SP_SUCCESS',
    FETCH_ALL_SP_FAILED: 'FETCH_ALL_SP_FAILED',

    FETCH_SAVE_INFO_SP_SUCCESS: 'FETCH_SAVE_INFO_SP_SUCCESS',
    FETCH_FAIL_INFO_SP_FAILED: 'FETCH_FAIL_INFO_SP_FAILED',

    //sản phẩm
    FETCH_ALL_SANPHAM_SUCCESS: 'FETCH_ALL_SANPHAM_SUCCESS',
    FETCH_ALL_SANPHAM_FAILED: 'FETCH_ALL_SANPHAM_FAILED',

    CREATE_SANPHAM_SUCCESS: 'CREATE_SANPHAM_SUCCESS',
    CREATE_SANPHAM_FAILED: 'CREATE_SANPHAM_FAIL',

    FETCH_SAVE_INFO_SANPHAM_SUCCESS: 'FETCH_SAVE_INFO_SANPHAM_SUCCESS',
    FETCH_FAIL_INFO_SANPHAM_FAILED: 'FETCH_FAIL_INFO_SANPHAM_FAILED',

    EDIT_SANPHAM_SUCCESS: 'EDIT_SANPHAM_SUCCESS',
    EDIT_SANPHAM_FAILED: 'EDIT_SANPHAM_FAIL',

    DELETE_SANPHAM_SUCCESS: 'DELETE_SANPHAM_SUCCESS',
    DELETE_SANPHAM_FAILED: 'DELETE_SANPHAM_FAIL',

    SEARCH_SANPHAM_THEOLOAI_SUCCESS: 'SEARCH_SANPHAM_THEOLOAI_SUCCESS',
    SEARCH_SANPHAM_THEOLOAI_FAILED: 'SEARCH_SANPHAM_THEOLOAI_FAILED',

    CREATE_BINHLUAN_SUCCESS: 'CREATE_BINHLUAN_SUCCESS',
    CREATE_BINHLUAN_FAILED: 'CREATE_BINHLUAN_FAILED',

    GET_ALL_BINHLUAN_SUCCESS: 'GET_ALL_BINHLUAN_SUCCESS',
    GET_ALL_BINHLUAN_FAILED: 'GET_ALL_BINHLUAN_FAILED',

    GET_ALL_BINHLUAN_ADMIN_SUCCESS: 'GET_ALL_BINHLUAN_ADMIN_SUCCESS',
    GET_ALL_BINHLUAN_ADMIN_FAILED: 'GET_ALL_BINHLUAN_ADMIN_FAILED',

    GET_ALL_TRALOI_SUCCESS: 'GET_ALL_TRALOI_SUCCESS',
    GET_ALL_TRALOI_FAILED: 'GET_ALL_TRALOI_FAILED',

    GET_ALL_TRALOI_ADMIN_SUCCESS: 'GET_ALL_TRALOI_ADMIN_SUCCESS',
    GET_ALL_TRALOI_ADMIN_FAILED: 'GET_ALL_TRALOI_ADMIN_FAILED',

    FETCH_ALL_SANPHAM_THEO_CUAHANG_SUCCESS:'FETCH_ALL_SANPHAM_THEO_CUAHANG_SUCCESS',
    FETCH_ALL_SANPHAM_THEO_CUAHANG_FAILED: 'FETCH_ALL_SANPHAM_THEO_CUAHANG_FAILED',

    FETCH_ALL_SANPHAM_THEO_LOAI_THUOC_CUAHANG_SUCCESS: 'FETCH_ALL_SANPHAM_THEO_LOAI_THUOC_CUAHANG_SUCCESS',
    FETCH_ALL_SANPHAM_THEO_LOAI_THUOC_CUAHANG_FAILED: 'FETCH_ALL_SANPHAM_THEO_LOAI_THUOC_CUAHANG_FAILED',
    //loại sản phẩm
    FETCH_ALL_LOAISANPHAM_START: 'FETCH_ALL_LOAISANPHAM_START',
    FETCH_ALL_LOAISANPHAM_SUCCESS:'FETCH_ALL_LOAISANPHAM_SUCCESS',
    FETCH_ALL_LOAISANPHAM_FAILED: 'FETCH_ALL_LOAISANPHAM_FAILED',

    CREATE_LOAISANPHAM_SUCCESS: 'CREATE_LOAISANPHAM_SUCCESS',
    CREATE_LOAISANPHAM_FAILED: 'CREATE_LOAISANPHAM_FAIL',

    EDIT_LOAISANPHAM_SUCCESS: 'EDIT_LOAISANPHAM_SUCCESS',
    EDIT_LOAISANPHAM_FAILED: 'EDIT_LOAISANPHAM_FAIL',

    DELETE_LOAISANPHAM_SUCCESS: 'DELETE_LOAISANPHAM_SUCCESS',
    DELETE_LOAISANPHAM_FAILED: 'DELETE_LOAISANPHAM_FAIL',

    //danh mục
    FETCH_ALL_LOAISANPHAM_START: 'FETCH_ALL_LOAISANPHAM_START',
    CREATE_DANHMUC_SUCCESS: 'CREATE_DANHMUC_SUCCESS',
    CREATE_LOAISANPHAM_FAILED: 'CREATE_LOAISANPHAM_FAIL',
    FETCH_ALL_DANHMUC_SUCCESS: 'FETCH_ALL_DANHMUC_SUCCESS',
    FETCH_ALL_DANHMUC_FAILED: 'FETCH_ALL_DANHMUC_FAILED',

    EDIT_DANHMUC_SUCCESS: 'EDIT_DANHMUC_SUCCESS',
    EDIT_DANHMUC_FAIL: 'EDIT_DANHMUC_FAIL',

    // tìm
    SEARCH_LOAISP_SUCCESS: 'SEARCH_LOAISP_SUCCESS',
    SEARCH_LOAISP_FAILED: 'SEARCH_LOAISP_FAILED',

    // giỏ hàng

    FETCH_ALL_GIOHANGNEW_START: 'FETCH_ALL_GIOHANGNEW_START',
    FETCH_ALL_GIOHANGNEW_SUCCESS:'FETCH_ALL_GIOHANGNEW_SUCCESS',
    FETCH_ALL_GIOHANGNEW_FAILED: 'FETCH_ALL_GIOHANGNEW_FAILED',

    GET_ALL_GIO_HANG_SUCCESS: 'GET_ALL_GIO_HANG_SUCCESS',
    GET_ALL_GIO_HANG_FAILED: 'GET_ALL_GIO_HANG_FAILED',

    CREATE_GIOHANG_SUCCESS: 'CREATE_GIOHANG_SUCCESS',
    CREATE_GIOHANG_FAILED: 'CREATE_GIOHANG_FAILED',

    DETELE_GIOHANG_SUCCESS: 'DETELE_GIOHANG_SUCCESS',
    DETELE_GIOHANG_FAILED: 'DETELE_GIOHANG_FAILED',


    // chi tiết đơn hàng

    GET_ALL_TRANGTHAI_SUCCESS: 'GET_ALL_TRANGTHAI_SUCCESS',
    GET_ALL_TRANGTHAI_FAILED: 'GET_ALL_TRANGTHAI_FAILED',
    // đơn hàng
    GET_ALL_DONHANG_SUCCESS: 'GET_ALL_DONHANG_SUCCESS',
    GET_ALL_DONHANG_FAILED: 'GET_ALL_DONHANG_FAILED',

    GET_ALL_CHITIETDONHANG_SUCCESS: 'GET_ALL_CHITIETDONHANG_SUCCESS',
    GET_ALL_CHITIETDONHANG_FAILED: 'GET_ALL_CHITIETDONHANG_FAILED',

    GET_TT_DH_SUCCESS: 'GET_TT_DH_SUCCESS',
    GET_TT_DH_FAILED:'GET_TT_DH_FAILED',

    // yêu thích
    GET_ALL_YEUTHICH_SUCCESS: 'GET_ALL_YEUTHICH_SUCCESS',
    GET_ALL_YEUTHICH_FAILED: 'GET_ALL_YEUTHICH_FAILED',

    CREATE_YEUTHICH_SUCCESS: 'CREATE_YEUTHICH_SUCCESS',
    CREATE_YEUTHICH_FAILED: 'CREATE_YEUTHICH_FAILED',

    DELETE_YEUTHICH_SUCCESS: 'DELETE_YEUTHICH_SUCCESS',
    DELETE_YEUTHICH_FAILED: 'DELETE_YEUTHICH_FAILED',

    // địa chỉ

    GET_DIACHIFROMUSER_SUCCESS: 'GET_DIACHIFROMUSER_SUCCESS',
    GET_DIACHIFROMUSER_FAILED: 'GET_DIACHIFROMUSER_FAILED',

    // MarkDown
    GET_ALLMARKDOWN_SUCCESS: 'GET_ALLMARKDOWN_SUCCESS',
    GET_ALLMARKDOWN_FAILED: 'GET_ALLMARKDOWN_FAILED',

    GET_ONEMARKDOWN_SUCCESS: 'GET_ONEMARKDOWN_SUCCESS',
    GET_ONEMARKDOWN_FAILED: 'GET_ONEMARKDOWN_FAILED',



    ///////////////////////////////////////////////////////// CỬA HÀNG ////////////////////////////////////
    CREATE_CUAHANG_SUCCESS: 'CREATE_CUAHANG_SUCCESS',
    CREATE_CUAHANG_FAILED: 'CREATE_CUAHANG_FAILED',


    GET_ALL_CUAHANG_SUCCESS: 'GET_ALL_CUAHANG_SUCCESS',
    GET_ALL_CUAHANG_FAILED: 'GET_ALL_CUAHANG_FAILED',

    UPDATE_CUAHANG_SUCCESS: 'UPDATE_CUAHANG_SUCCESS',
    UPDATE_CUAHANG_FAILED: 'UPDATE_CUAHANG_FAILED',
})

export default actionTypes;