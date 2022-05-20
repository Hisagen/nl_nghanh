export const path = {
    HOME: '/',
    HOMEPAGE: '/home',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    DETAIL_SP: '/detail_sp/:id',
    GIOHANG: '/giohang/:idUser',
    DANHMUC: '/Danhmucsanpham/',
    LOAISP: '/Loaisanpham/',
    LICHSUMUAHNAG: '/lichsumuahang/',
    CHITIET: '/ChiTietGioHangKhach/:id_chitiet',
    TINTUC: '/tintuc/',
    CHITIETTINTUC: '/chitiettintuc/:id',
    SANPHAM: '/sanpham/',
    DANGKY: '/dangky/',
    UNGDUNG: '/ungdung/',
    //admin
    LICHSUMUAHNAGADMIN: '/lichsumuahangAdmin/',
    CHITIETADMIN: '/ChiTietGioHangKhachAdmin/:id_chitiet/:tt_donhang',
    BAIVIET: '/baiviet/',
    SANPHAMMANAGE: '/Sanpham/manage-sanpham',

    // cửa hàng
    CUAHANG: '/manage/cuahang',
    DETAILSTORE: '/detail-store/:id',
    ALLSANPHAMMOTCUAHANG: '/all-sanpham-mot-cuahang/:idCuaHang',
    SANPHAMTIMKIEM: '/sanpham-timkiem/:key',

};

export const LANGUAGES = {
    VI: 'vi',
    EN: 'en'
};
 
export const CRUD_ACTIONS = {
    CREATE: "CREATE",
    EDIT: "EDIT",
    DELETE: "DELETE",
    READ: "READ"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}

export const USER_ROLE = {
    ADMIN: "R1",
    MEMBER:"R3", 
    CUSTOMER: "R2"
}