import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { DiaryDispatchContext } from '../App';
import { setPageTitle } from '../util';
import Button from '../components/Button';
import Header from '../components/Header';
import useDiary from '../hooks/useDiary';
import Editor from '../components/Editor';

const Edit = () => {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const onSubmit = data => {
    if (window.confirm('일기를 정말 수정할까요?')) {
      const { date, content, emotionId } = data;
      onUpdate(id, date, content, emotionId);
      navigate('/', { replace: true });
    }
  };

  const onClickDelete = () => {
    if (window.confirm('일기를 정말 삭제할까요? 다시 복구되지 않아요!')) {
      onDelete(id);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    setPageTitle(`${id}번 일기 수정하기`);
  }, [id]);

  if (!data) {
    return <div>일기를 불러오고 있습니다...</div>;
  } else {
    return (
      <div>
        <Header
          title={'일기 수정하기'}
          leftChild={<Button text={'< 뒤로 가기'} onClick={goBack} />}
          rightChild={<Button type={'negative'} text={'삭제하기'} onClick={onClickDelete} />}
        />
        <Editor initData={data} onSubmit={onSubmit} />
      </div>
    );
  }
};

export default Edit;
