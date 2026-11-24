import { useState, useEffect } from 'react';
import { fetchShopActivity } from '../api';
import { PREVIEW_SHOP_ACTIVITY } from '../data/preview-shop-activity';

export function useShopActivity() {
  const [activity, setActivity] = useState(PREVIEW_SHOP_ACTIVITY);
  useEffect(() => {
    const ctrl = new AbortController();
    fetchShopActivity(ctrl.signal)
      .then((data) => setActivity(data))
      .catch(() => {});

    return () => ctrl.abort();
  }, []);

  return activity;
}
