'use server';

import { revalidatePath, unstable_cache } from 'next/cache';
import { getSupabaseServerClient } from '@/lib/supabase-server';

export async function loginAdmin(username: string, password: string) {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .limit(1)
      .single();

    if (error || !data) {
      return { success: false, error: 'Invalid username or password' };
    }

    if (data.password === password) {
      return { 
        success: true, 
        user: { 
          id: data.id,
          username: data.username,
          role: data.role || 'admin'
        } 
      };
    } else {
      return { success: false, error: 'Invalid username or password' };
    }
  } catch (error: any) {
    console.error('Supabase Server Error:', error);
    return { success: false, error: 'An error occurred while authenticating' };
  }
}

export async function getAdmins() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return { success: true, admins: data };
  } catch (error: any) {
    console.error('Error fetching admins:', error);
    return { success: false, error: 'Failed to load admins' };
  }
}

export async function createAdmin(username: string, password: string, role: string) {
  try {
    const supabase = getSupabaseServerClient();
    
    // Check if username exists
    const { data: existing } = await supabase
      .from('admin_users')
      .select('id')
      .eq('username', username);

    if (existing && existing.length > 0) {
      return { success: false, error: 'Username already exists' };
    }

    const { error } = await supabase
      .from('admin_users')
      .insert([{ username, password, role }]);
      
    if (error) throw error;
    
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Error creating admin:', error);
    return { success: false, error: 'Failed to create admin' };
  }
}

export async function updateAdmin(id: string, username: string, password?: string, role?: string) {
  try {
    const supabase = getSupabaseServerClient();
    
    const updateData: any = { username, role };
    if (password) {
      updateData.password = password;
    }

    // Check if new username exists for a DIFFERENT user
    const { data: existing } = await supabase
      .from('admin_users')
      .select('id')
      .eq('username', username)
      .neq('id', id);

    if (existing && existing.length > 0) {
      return { success: false, error: 'Username already exists' };
    }

    const { error } = await supabase
      .from('admin_users')
      .update(updateData)
      .eq('id', id);
      
    if (error) throw error;
    
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating admin:', error);
    return { success: false, error: 'Failed to update admin' };
  }
}

export async function deleteAdmin(adminId: string) {
  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from('admin_users')
      .delete()
      .eq('id', adminId);
      
    if (error) throw error;
    
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting admin:', error);
    return { success: false, error: 'Failed to delete admin' };
  }
}

export const getConfig = unstable_cache(
  async () => {
    try {
      const supabase = getSupabaseServerClient();
      const { data, error } = await supabase
        .from('configuration')
        .select('*')
        .eq('id', 'main')
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is no rows returned
         throw error;
      }
      
      // If no config found, return an empty object or default
      return { success: true, config: data || {} };
    } catch (error: any) {
      if (error.message !== 'Supabase request timeout') {
        console.error('Error fetching config:', error);
      }
      return { success: false, error: 'Failed to load configuration' };
    }
  },
  ['global-config'],
  { revalidate: 60, tags: ['config'] }
);

export async function updateConfig(data: { discord?: string; mail?: string; documentation?: string; github?: string; website?: string; youtube?: string }) {
  try {
    const supabase = getSupabaseServerClient();
    
    // Upsert the main configuration row
    const { error } = await supabase
      .from('configuration')
      .upsert({ id: 'main', ...data });
      
    if (error) throw error;
    
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating config:', error);
    return { success: false, error: 'Failed to update configuration' };
  }
}

// =======================
// PRODUCTS ACTIONS
// =======================

export const getProducts = unstable_cache(
  async () => {
    try {
      const supabase = getSupabaseServerClient();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return { success: true, products: data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  ['all-products'],
  { revalidate: 60, tags: ['products'] }
);

export async function createProduct(data: any) {
  try {
    const supabase = getSupabaseServerClient();
    const { data: result, error } = await supabase
      .from('products')
      .insert([data])
      .select()
      .single();
      
    if (error) throw error;
    
    revalidatePath('/');
    revalidatePath('/products');
    return { success: true, product: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const supabase = getSupabaseServerClient();
    const { data: result, error } = await supabase
      .from('products')
      .update(data)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    revalidatePath('/');
    revalidatePath('/products');
    return { success: true, product: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    revalidatePath('/');
    revalidatePath('/products');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function uploadProductImage(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) throw new Error("No file provided");

    const supabase = getSupabaseServerClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { data, error } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (error) throw error;
    
    return { success: true, fileId: data.path };
  } catch (error: any) {
    console.error("Upload error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProductImage(fileId: string) {
  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.storage
      .from('products')
      .remove([fileId]);
      
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// =======================
// FAQ ACTIONS
// =======================

export const getFaqs = unstable_cache(
  async () => {
    try {
      const supabase = getSupabaseServerClient();
      const { data, error } = await supabase
        .from('faq')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return { success: true, faqs: data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  ['all-faqs'],
  { revalidate: 60, tags: ['faq'] }
);

export async function createFaq(data: { question: string; answer: string }) {
  try {
    const supabase = getSupabaseServerClient();
    const { data: result, error } = await supabase
      .from('faq')
      .insert([data])
      .select()
      .single();
      
    if (error) throw error;
    
    revalidatePath('/', 'layout');
    revalidatePath('/admin/dashboard');
    return { success: true, faq: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateFaq(id: string, data: { question: string; answer: string }) {
  try {
    const supabase = getSupabaseServerClient();
    const { data: result, error } = await supabase
      .from('faq')
      .update(data)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    revalidatePath('/', 'layout');
    revalidatePath('/admin/dashboard');
    return { success: true, faq: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteFaq(id: string) {
  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from('faq')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    revalidatePath('/', 'layout');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
