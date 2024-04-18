import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faFilePen,faUpRightFromSquare,faAddressCard } from '@fortawesome/free-solid-svg-icons';


<FontAwesomeIcon icon="fa-solid fa-pen-to-square" />

function BottomNavi() {

    return (
        <section className="quick_mob1">
            <div className="containerV1">
                <article className="linkBox">
                    <ul className="listType1">
                        <li className="item">
                            <Link to="/templateSelection" className="item_wrap">
                                <FontAwesomeIcon icon={faPenToSquare} />
                                <p>작성 하기</p>
                            </Link>
                        </li>
                        <li className="item">
                            <Link to="/" className="item_wrap">
                                <FontAwesomeIcon icon={faFilePen} />
                                <p>수정 하기</p>
                            </Link>
                        </li>
                        <li className="item">
                            <Link to="/" className="item_wrap">
                                <FontAwesomeIcon icon={faUpRightFromSquare} />
                                <p>공유 하기</p>
                            </Link>
                        </li>
                        <li className="item">
                            <Link to="/view" className="item_wrap">
                                <FontAwesomeIcon icon={faAddressCard} />
                                <p>내 프로필</p>
                            </Link>
                        </li>
                        {/* 추가 리스트 항목 */}
                    </ul>
                </article>
            </div>
        </section>
    );
}

export default BottomNavi;