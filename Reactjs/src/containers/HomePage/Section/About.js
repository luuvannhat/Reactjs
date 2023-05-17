/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class About extends Component {


    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về Bookingcare
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/1sHF_Fa9-0E"
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKING CARE - KHÁM BỆNH THỜI CÔNG NGHỆ"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>

                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Chương trình cà phê khởi nghiệp của VTV1 - Đài truyền hình Việt Nam giới thiệu Nền tảng đặt khám bác sĩ chuyên khoa BookingCare.
                            BookingCare là một hệ thống đặt lịch khám giúp người bệnh dễ dàng lựa chọn bác sĩ chuyên khoa phù hợp dựa trên mạng lưới các bác sĩ chuyên khoa, thông tin được xác thực rõ ràng, minh bạch hóa các thông tin liên quan đến hoạt động khám chữa bệnh: thời gian, quy trình, giá cả dịch vụ, trang thiết bị, bảo hiểm, địa chỉ, kinh nghiệm, đào tạo của bác sĩ…
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
