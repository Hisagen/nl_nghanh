import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./Handbook.scss";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import Ungdung from './Ungdung';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

class Handbook extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll:  1,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
        };

        return (
            <div className='Tong'>
                <div className='Handbook'>
                <div className='CN24h'>
                <div className='header-24h'>
                    <span className='title24h'>TIN TỨC</span>
                    <button className='btn-24h'>xem thêm</button>
                </div>
                <div className='img-1'>

                </div>
                <div className='text'>
                Nghe Đồn Là: OPPO A97 có giá 8.8 triệu đồng,
                cấu hình mạnh mẽ với chip Snapdragon 778+ cùng camera xịn sò
                (liên tục cập nhật)
                </div>
                </div>
                <div className='CN24h-2'>
                    
                    <div className='test1'>
                    <div className='img-2 img-3'>

                    </div>
                    <div className='text-2'>
                    Cách quay số nhanh trên điện thoại Samsung, để bạn có thể thực hiện cuộc gọi thần tốc chỉ với một cú chạm.
                    </div>
                    </div>
                    
                    <div className='test1'>
                    <div className='img-2 img-4'>

                    </div>
                    <div className='text-2 '>
                    Chỉ vài ngày cuối tuần: 3 mẫu Galaxy A cực HOT có ROM 128GB giảm sốc đến 1.5 triệu, thêm trả góp 0% sao mà chưa sắm nữa?
                    </div>
                    </div>
                        
                    <div className='test1'>
                    <div className='img-2 img-5'>

                    </div>
                    <div className='text-2'>
                    Tới công chuyện: Ai hay chia sẻ tài khoản Netflix với bạn bè cho 'đỡ tiền' thì xem ngay, có thể sẽ tốn thêm khoản phí nữa đấy
                    </div>
                    </div>

                    <div className='test1 '>
                    <div className='img-2 img-6'>

                    </div>
                    <div className='text-2'>
                    Trên tay Nokia G11: Giá chỉ hơn 3 triệu* nhưng có màn hình 90 Hz cực đỉnh, pin dùng lên đến 3 ngày, sạc nhanh 18 W
                    </div>
                    </div>

                    <div className='test1'>
                    <div className='img-2 img-7'>

                    </div>
                    <div className='text-2'>
                    Sắm gì tháng 3 này? Xem ngay 5 mẫu tai nghe không dây rẻ nhất giảm đậm đến 60%, giá rẻ bèo chỉ từ 220K
                    </div>
                    </div>
                </div>
            </div>
            <div className='Ungdung'>
                <Ungdung/>
            </div>
            </div>
            
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
