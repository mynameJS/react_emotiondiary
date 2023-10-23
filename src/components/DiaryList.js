import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';
import Button from './Button';
import './DiaryList.css';

const sortOptionList = [
  { value: 'lastest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
];

const DiaryList = ({ data }) => {
  const [sortType, setSortType] = useState('lastest');
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const compare = (a, b) => {
      if (sortType === 'lastest') {
        return Number(b.date) - Number(a.date);
      } else {
        return Number(a.date) - Number(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(data));
    copyList.sort(compare);
    setSortedData(copyList);
  }, [data, sortType]);

  const onChangeSortType = e => {
    setSortType(e.target.value);
  };

  const navigate = useNavigate();

  const onClickNew = () => {
    navigate('/new');
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <select value={sortType} onChange={onChangeSortType}>
            {sortOptionList.map((item, idx) => (
              <option key={idx} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="right_col">
          <Button type={'positive'} text={'새 일기 쓰기'} onClick={onClickNew} />
        </div>
      </div>
      <div className="list_wrapper">
        {sortedData.map(item => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
