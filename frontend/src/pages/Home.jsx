import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header/Header';
import HeaderLogin from '../components/Header/HeaderLogin';
import ContentSection from '../components/ContentSection';
import { useContentPage } from '../hooks/useContentPage';

const Home = () => {
  const { user } = useAuth();
  const contentProps = useContentPage();
  return (
    <>
      {user ? <HeaderLogin /> : <Header />}
      <ContentSection {...contentProps} />
    </>
  );
};

export default Home; 