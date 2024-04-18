import React, { useState } from 'react';
import { useLocation,Link, useNavigate } from 'react-router-dom';
import api from '../api'; // api 인스턴스 불러오기

function Write() {
    const location = useLocation();
    const { selectedTemplate, userEmail } = location.state || {};
    const [formData, setFormData] = useState({
        name: '',
        hp: '',
        fax: '',
        address: '',
        url: '',
        produc: '',
        rank: '',
        cname: '',
        imgurl: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhoneChange = (e) => {
        const { name, value } = e.target;
        const numbersOnly = value.replace(/[^\d]/g, '');
        setFormData({ ...formData, [name]: numbersOnly });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSubmit = { ...formData, email: userEmail };

        try {
            await api.post('/api/contact', dataToSubmit);
            setMessage('저장되었습니다');
        } catch (error) {
            console.error("Error:", error);
            setMessage('저장에 실패했습니다');
        }
    };


    return (
        <div className='HYUN write_frame'>
            <div className='top_text_v1'>
                <p>내 명함 작성</p>
            </div>
            <ul class="input_list">
                <li class="required">
                    <input type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="이름"
                        required />
                </li>
                <li>
                    <input type="text"
                        name="cname"
                        value={formData.cname}
                        onChange={handleChange}
                        placeholder="기업명" />
                </li>
                <li>
                    <input type="text"
                        name="rank"
                        value={formData.rank}
                        onChange={handleChange}
                        placeholder="직책 (예: 대표이사, 부장 등)" />
                </li>
                <li class="required">
                    <input type="text"
                        name="hp"
                        value={formData.hp}
                        onChange={(e) => handlePhoneChange(e, 'hp')}
                        placeholder="휴대폰 번호 입력"
                        required />
                </li>
                <li>
                    <input type="text"
                        name="fax"
                        value={formData.fax}
                        onChange={(e) => handlePhoneChange(e, 'fax')}
                        placeholder="FAX번호 입력" />
                </li>
                <li class="required">
                    <input type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="주소 입력"
                        required />
                </li>
                <li>
                    <input type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        placeholder="홈페이지 URL주소 입력" />
                </li>
                <li>
                    <textarea
                        name="produc"
                        value={formData.produc}
                        onChange={handleChange}
                        placeholder='본인 소개 입력'></textarea>
                </li>
                <li>
                    <input type="file" name="image" />
                </li>
            </ul>
            {/* <p>선택된 템플릿: {selectedTemplate}</p>
            <p>사용자 이메일: {userEmail}</p>
            {message && <div className="message">{message}</div>} */}
            <div className='btn_v1'>
                <Link to="/" className="link cancel">취소</Link>
                <button className='link done' onClick={handleSubmit}>작성 완료</button>
            </div>
        </div>
    );
}    

export default Write;