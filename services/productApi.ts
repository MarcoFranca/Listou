// services/productApi.ts

export async function searchProducts(term: string) {
    try {
        const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(term)}&search_simple=1&json=1`;
        const resp = await fetch(url, {
            headers: {
                "User-Agent": "ListouApp/1.0 (marco@autentika.com.br)"
            }
        });
        const data = await resp.json();
        return Array.isArray(data.products)
            ? data.products.filter(
                (p: any) => !!p.product_name && p.product_name.trim().length > 0
            )
            : [];
    } catch (err) {
        console.log("Erro na busca de produtos:", err);
        return [];
    }
}

export async function getProductByBarcode(barcode: string) {
    try {
        const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}`;
        const resp = await fetch(url, {
            headers: {
                "User-Agent": "ListouApp/1.0 (marco@autentika.com.br)"
            }
        });
        const data = await resp.json();
        return data.product || null;
    } catch (err) {
        console.log("Erro ao buscar por código:", err);
        return null;
    }
}
