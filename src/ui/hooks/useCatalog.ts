import { useState, useEffect, useCallback } from 'react';
import { Product } from '../../core/types/entities';
import { AppError } from '../../core/types/api';
import { CatalogService } from '../../modules/catalog/catalogService';

export function useCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const loadLocal = useCallback(async () => {
    const localProducts = await CatalogService.getProducts();
    setProducts(localProducts);
  }, []);

  const sync = useCallback(async () => {
    const result = await CatalogService.syncProducts();
    if (!result.ok) {
      setError(result.error);
    } else {
      setError(null);
    }
    await loadLocal();
  }, [loadLocal]);

  useEffect(() => {
    let mounted = true;

    async function init() {
      setLoading(true);
      await loadLocal();
      if (mounted) setLoading(false);
      await sync();
      if (mounted) setLoading(false);
    }

    init();
    return () => { mounted = false; };
  }, [loadLocal, sync]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await sync();
    setRefreshing(false);
  }, [sync]);

  return { products, loading, refreshing, error, refresh };
}
