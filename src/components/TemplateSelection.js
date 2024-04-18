import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // api 인스턴스 불러오기

function TemplateSelection() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const templates = [
    { id: 'skin1', image: '/img/template1.jpg' },
    { id: 'skin2', image: '/img/template2.jpg' },
    { id: 'skin3', image: '/img/template2.jpg' },
    { id: 'skin4', image: '/img/template2.jpg' },
    { id: 'skin5', image: '/img/template2.jpg' },
  ];

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.currentTarget.value);
  };  

  const handleSubmit = async () => {
    if (!userEmail) {
      alert('사용자 정보를 불러올 수 없습니다. 다시 로그인해주세요.');
      navigate('/login');
      return;
    }
    
    if (!selectedTemplate) {
      alert('템플릿을 선택해주세요.');
      return;
    }
  
    try {
        const response = await api.post('/api/saveTemplateSelection', {
            email: userEmail,
            skin: selectedTemplate  // 'selectedTemplate' 대신 'skin' 사용
          });          
      alert('선택이 완료되었습니다.');
      navigate('/write', { state: { selectedTemplate, userEmail } });
    } catch (error) {
      alert('선택을 저장하는 중 오류가 발생했습니다: ' + error.message);
    }
  };

  return (
    <div className='HYUN template_selection'>
      <div className='top_text_v1'>
        <p>내 명함 디자인</p>
      </div>
      <section className='box_select'>
        {templates.map((template) => (
          <div className='item' key={template.id}>
            <input
              type="radio"
              id={template.id}
              name="template"
              value={template.id}
              checked={selectedTemplate === template.id}
              onChange={handleTemplateChange}
            />
            <div className='submit_box'>
              <button onClick={handleSubmit}>선택 완료</button>
            </div>
            <label htmlFor={template.id}>
              <img src={template.image} alt={`템플릿 ${template.id}`} />
            </label>
          </div>
        ))}
      </section>
    </div>
  );
}

export default TemplateSelection;