import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Viewer from '../components/Viewer';
import { getFormattedDate, setPageTitle } from '../util';
import useDiary from '../hooks/useDiary';

const Diary = () => {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    setPageTitle(`${id}번 일기`);
  }, [id]);

  if (!data) {
    return <div>일기를 불러오고 있습니다....</div>;
  } else {
    const { date, emotionId, content } = data;
    const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
    return (
      <div>
        <Header
          title={title}
          leftChild={<Button text={'< 뒤로가기'} onClick={goBack} />}
          rightChild={<Button text={'수정하기'} onClick={goEdit} />}
        />
        <div>{id}번 일기</div>
        <div>Diary 페이지입니다</div>
        <div>
          <Viewer content={content} emotionId={emotionId} />
        </div>
      </div>
    );
  }
};

export default Diary;
