// -------------- FORM --------------

type FormTypeMethod = 'create' | 'update' | 'delete';

// -------------- Category --------------

type CategoriesType = 'income' | 'expense';

type Category = {
  id: string;
  name: string;
  type: CategoriesType;
  created_at?: string;
};

// -------------- PROFILE --------------

interface Profiles {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
}

// -------------- TRANSACTION --------------

interface Transaction {
  id: number; // opsional saat edit
  user_id?: string;
  category_id: number;
  amount: number;
  type: CategoriesType; // biasanya ikut dari kategori, tapi tetap disiapkan
  description: string;
  date: string; // format: 'YYYY-MM-DD'
  created_at?: string;
  transactions_category_id_fkey?: any;
}

interface Budgets {
  id: number;
  user_id?: string;
  category_id: number;
  start_date: string;
  end_date: string;
  amount_limit: number;
  created_at?: string;
  budgets_category_id_fkey?: {
    name: string;
  };
}
