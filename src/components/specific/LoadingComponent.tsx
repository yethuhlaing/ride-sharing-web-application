import { Loader2 } from 'lucide-react'
import React from 'react'

function LoadingComponent() {
    return (
       <div className='flex justify-center items-center'>
            <Loader2 className="mr-2 w-6 h-6 animate-spin" />
       </div>
    )
}

export default LoadingComponent