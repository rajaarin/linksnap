import { supabase } from './supabase';

const paymentService = {
  // Create payment transaction record
  createPaymentTransaction: async (transactionData) => {
    try {
      const { data, error } = await supabase
        .from('payment_transactions')
        .insert([{
          user_id: transactionData.user_id,
          transaction_id: transactionData.transaction_id,
          cashfree_order_id: transactionData.cashfree_order_id,
          amount: transactionData.amount,
          currency: transactionData.currency || 'INR',
          payment_method: transactionData.payment_method,
          payment_status: transactionData.payment_status || 'pending',
          subscription_months: transactionData.subscription_months || 3,
          payment_gateway_response: transactionData.payment_gateway_response
        }])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to create payment transaction' };
    }
  },

  // Update payment transaction status
  updatePaymentStatus: async (transactionId, status, gatewayResponse = null) => {
    try {
      const updateData = {
        payment_status: status,
        updated_at: new Date().toISOString()
      };

      if (gatewayResponse) {
        updateData.payment_gateway_response = gatewayResponse;
      }

      const { data, error } = await supabase
        .from('payment_transactions')
        .update(updateData)
        .eq('transaction_id', transactionId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update payment status' };
    }
  },

  // Get user payment transactions
  getUserPayments: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('payment_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to fetch payment transactions' };
    }
  },

  // Update user subscription after successful payment
  updateUserSubscription: async (userId, subscriptionMonths = 3) => {
    try {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + subscriptionMonths);

      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          subscription_plan: 'premium',
          subscription_expires_at: expiresAt.toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update user subscription' };
    }
  },

  // Handle payment success callback
  handlePaymentSuccess: async (paymentData) => {
    try {
      // Update payment status to completed
      const paymentUpdate = await paymentService.updatePaymentStatus(
        paymentData.transaction_id,
        'completed',
        paymentData.gateway_response
      );

      if (!paymentUpdate.success) {
        return paymentUpdate;
      }

      // Update user subscription
      const subscriptionUpdate = await paymentService.updateUserSubscription(
        paymentData.user_id,
        paymentData.subscription_months || 3
      );

      if (!subscriptionUpdate.success) {
        return subscriptionUpdate;
      }

      return { success: true, data: { payment: paymentUpdate.data, subscription: subscriptionUpdate.data } };
    } catch (error) {
      return { success: false, error: 'Failed to process payment success' };
    }
  },

  // Handle payment failure callback
  handlePaymentFailure: async (paymentData) => {
    try {
      const result = await paymentService.updatePaymentStatus(
        paymentData.transaction_id,
        'failed',
        paymentData.gateway_response
      );

      return result;
    } catch (error) {
      return { success: false, error: 'Failed to process payment failure' };
    }
  }
};

export default paymentService;