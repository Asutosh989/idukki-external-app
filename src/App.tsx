import { useQuery } from '@apollo/client';
import React from 'react';
import { Loading } from 'sha-el-design';
import { useApi } from './Api';
import { API_ROUTES, idukkiClient } from './config';
import { QueryRoot, ReviewDisplayType } from './typings';
import { ReviewQuery } from './graphql';
import { useState } from 'react';
import { HomePage } from './Review/HomePage';
import { ProductDetailPage } from './Review/ProductDetailPage';

function App() {
  const id = document.querySelector('[data-review]')?.getAttribute('data-review');
  const productId = document.querySelector('[data-review]')?.getAttribute('data-product-id');
  const { data: reviewDisplay, loading } = useApi<ReviewDisplayType>(API_ROUTES.reviewDisplay(id || ''));
  const [first, updateFirst] = useState(5);
  const { data } = useQuery<Pick<QueryRoot, 'reviewOutQuery'>>(ReviewQuery, {
    client: idukkiClient,
    variables: {
      passkey: id,
      first: first,
      offset: 0,
      productId,
    }
  })
  
  if (!id) {
    return <div>Html tag not found, check doc!!!</div>
  }

  if (reviewDisplay?.displayPlace === 'PRODUCT_DETAIL_PAGE' && !productId) {
    return <h1>Invalid Setting, check docs!!</h1>
  }

  if (loading) {
    return <Loading isLoading />
  }

  const ReviewHomePage = () => <HomePage showLoadMore loadMore={() => updateFirst(first + 5)} review={data?.reviewOutQuery || []} />;

  switch (reviewDisplay?.displayPlace) {
    case 'HOME_PAGE':
      return ReviewHomePage();
    case 'PRODUCT_DETAIL_PAGE':
      return <ProductDetailPage review={data?.reviewOutQuery || []} />;
    default:
      ReviewHomePage();
  }

  return ReviewHomePage();
}

export default App;
