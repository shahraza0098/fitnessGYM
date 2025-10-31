"use client"
import React from 'react'
import { supabase } from '@/utils/supabase/server'
function page() {
    async function testSupabase() {
        let { data: MembershipPlan, error } = await supabase
  .from('MembershipPlan')
  .select('name')
        console.log("MembershipPlan:", MembershipPlan, "Error:", error);
    }

    React.useEffect(() => {
        testSupabase();
    }, []);
    
  return (
    <div>
      <h1>Testing...</h1>
    </div>
  )
}

export default page
