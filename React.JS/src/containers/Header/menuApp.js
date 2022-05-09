export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage', 
        menus: [
            {
                name: 'menu.admin.crud-redux', link: '/System/UserRedux',
                // subMenus: [
                //     { name: 'menu.posts.manage-posts', link: '/posts/manage-posts'},
                // ]
            
            },
            {
                name: 'menu.admin.store', link: '/baiviet/',
                // subMenus: [
                //     { name: 'menu.posts.manage-posts', link: '/posts/manage-posts'},
                // ]
            },
            {
                name: 'menu.comment.manage-comment', link: '/baiviet/',
                // subMenus: [
                //     { name: 'menu.posts.manage-posts', link: '/posts/manage-posts'},
                // ]
            },
        ]            
    },
];

export const sanphamMenu = [
    {
        name: 'menu.order.order', 
        menus: [
            {
                name: 'menu.order.manage-order', link: '/Sanpham/manage-sanpham',
            },
        ]
    }
];

