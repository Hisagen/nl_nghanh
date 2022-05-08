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

    // { //quản lý sản phẩm
    //     name: 'menu.product.product', 
    //     menus: [
    //         {
    //             name: 'menu.product.manage-product-category', link: '/Danhmucsanpham/manage-danhmucsanpham'
    //         },
    //         {
    //             name: 'menu.product.manage-product-type', link: '/Loaisanpham/manage-loaisanpham'
    //         },
    //         { 
    //             name: 'menu.product.manage-product', link: '/Sanpham/manage-sanpham',
                
    //         },
            
            
    //     ]
    // },

    // { //quản lý bình luận
    //     name: 'menu.admin.store', 
    //     menus: [
    //         {
    //             name: 'menu.admin.store', link: '/baiviet/',
    //             // subMenus: [
    //             //     { name: 'menu.posts.manage-posts', link: '/posts/manage-posts'},
    //             // ]
    //         },
    //     ]
    // },


    // { //quản lý danh mục sản phẩm
    //     name: 'menu.order.order', 
    //     menus: [
    //         {
    //             name: 'menu.order.manage-order', link: '/lichsumuahangAdmin/',
    //             // subMenus: [
    //             //     { name: 'menu.posts.manage-posts', link: '/posts/manage-posts'},
    //             // ]
    //         },
    //     ]
    // },

   
       
   
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

