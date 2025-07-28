-- Location: supabase/migrations/20250127100000_add_payment_tracking.sql
-- Schema Analysis: Adding payment tracking to existing LinkSnap system
-- Integration Type: Extension of existing schema
-- Dependencies: Existing user_profiles table

-- Add payment tracking table
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');
CREATE TYPE public.payment_method AS ENUM ('cashfree', 'card', 'upi', 'netbanking');

CREATE TABLE public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    transaction_id TEXT,
    cashfree_order_id TEXT,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    payment_method public.payment_method,
    payment_status public.payment_status DEFAULT 'pending'::public.payment_status,
    subscription_months INTEGER DEFAULT 3,
    payment_gateway_response JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Essential Indexes
CREATE INDEX idx_payment_transactions_user_id ON public.payment_transactions(user_id);
CREATE INDEX idx_payment_transactions_status ON public.payment_transactions(payment_status);
CREATE INDEX idx_payment_transactions_transaction_id ON public.payment_transactions(transaction_id);

-- RLS Setup
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- Helper function for payment access
CREATE OR REPLACE FUNCTION public.owns_payment_transaction(transaction_uuid UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
SELECT EXISTS (
    SELECT 1 FROM public.payment_transactions pt
    WHERE pt.id = transaction_uuid AND pt.user_id = auth.uid()
)
$$;

-- RLS Policy
CREATE POLICY "users_manage_own_payments" ON public.payment_transactions FOR ALL
USING (public.owns_payment_transaction(id)) WITH CHECK (public.owns_payment_transaction(id));