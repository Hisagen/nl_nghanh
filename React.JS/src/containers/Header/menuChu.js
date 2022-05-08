export const adminMenu = [
    // { //quản lý người dùng
    //     name: 'menu.admin.manage', 
    //     menus: [
    //         // {
    //         //     name: 'menu.admin.manage', link: '/system/UserManage',
    //         //     // subMenus: [
    //         //     //     { name: 'menu.admin.manage-admin', link: '/admin/manage-admin'},
    //         //     //     { name: 'menu.admin.manage-guest', link: '/admin/manage-guest'},
    //         //     //     // { name: 'menu.system.system-administrator.user-redux', link: '/system/UserRedux' },
    //         //     // ]
    //         // },
    //         // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },

    //         {
    //             name: 'menu.admin.crud-redux', link: '/System/UserRedux',
    //             // subMenus: [
    //             //     { name: 'menu.posts.manage-posts', link: '/posts/manage-posts'},
    //             // ]
    //         },

    //         // {
    //         //     name: 'menu.admin.crud-redux', link: '/System/SP-manage',
    //         //     // subMenus: [
    //         //     //     { name: 'menu.posts.manage-posts', link: '/posts/manage-posts'},
    //         //     // ]
    //         // },
    //     ]
    // },

    { //quản lý sản phẩm
        name: 'menu.product.product', 
        menus: [
            {
                name: 'menu.product.manage-product-category', link: '/Danhmucsanpham/manage-danhmucsanpham'
            },
            {
                name: 'menu.product.manage-product-type', link: '/Loaisanpham/manage-loaisanpham'
            },
            { 
                name: 'menu.product.manage-product', link: '/Sanpham/manage-sanpham',
                
            },
            
            
        ]
    },

    { //quản lý sản phẩm
        name: 'menu.posts.posts', 
        menus: [
            {
                name: 'menu.posts.manage-posts', link: '/baiviet/',
                // subMenus: [
                //     { name: 'menu.posts.manage-posts', link: '/posts/manage-posts'},
                // ]
            },
        ]
    },

    // { //quản lý sản phẩm
    //     name: 'menu.comment.comment', 
    //     menus: [
    //         {
    //             name: 'menu.comment.manage-comment', link: '/comment/manage-comment',
    //             // subMenus: [
    //             //     { name: 'menu.comment.manage-comment', link: '/comment/manage-comment'},
    //             // ]
    //         },
    //     ]
    // },

    { //quản lý sản phẩm
        name: 'menu.order.order', 
        menus: [
            {
                name: 'menu.order.manage-order', link: '/lichsumuahangAdmin/',
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

