import React from 'react'
import {inject, observer} from "mobx-react"
import {toJS} from "mobx"

export const ShapeView = inject("rootStore")(
    observer((props) => {
        
    return (
        <div>
            
        </div>
    )
}))
