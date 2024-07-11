import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import NotFound from '../../NotFound';

export default  async function History({ params }: any) {
    const { user_id } = params;

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return <>
        {
            user_id !== user?.id ? (
                <>
                    <Card>

                    </Card>
                </>
            ) : (
                <NotFound />
            )
        }
    </>

    
}
