import React, { useState } from 'react'
import { ColumnDef } from './types'
import Button from '../button'
import Row from '../row'

type TablePaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  borderColor: string
  totalItems: number
  pageSize: number,
  buttonHeight?: number
  buttonWidth?: number
}

export default function TablePagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  borderColor,
  totalItems,
  pageSize,
  buttonHeight = 35,
  buttonWidth = 44
}: TablePaginationProps) {
    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems)

    return (
        <div className="flex items-center justify-end px-4 py-3"
            style={{ borderTop: `1px solid ${borderColor}` }}>
            <Row gap={2}>
                <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium">{startItem}</span>
                    <span className="px-1">-</span>
                    <span className="font-medium">{endItem}</span>
                    <span className="px-1">of</span>
                    <span className="font-medium">{totalItems}</span>
                </div>
                <Button 
                    icon="fa-solid fa-backward-fast" 
                    iconPosition='right'
                    disabled={currentPage === 1}
                    visible={totalPages > 2}
                    onClick={() => onPageChange(1)}
                    textColor="#ffffff"
                    backgroundColor={borderColor}
                    borderColor={borderColor}
                    hoverTextColor={borderColor}
                    hoverBackgroundColor="#ffffff"
                    hoverBorderColor={borderColor}
                    height={buttonHeight}
                    width={buttonWidth}/>
                <Button 
                    icon="fa-solid fa-backward" 
                    iconPosition='left'
                    disabled={currentPage === 1}
                    visible={totalPages > 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    textColor="#ffffff"
                    backgroundColor={borderColor}
                    borderColor={borderColor}
                    hoverTextColor={borderColor}
                    hoverBackgroundColor="#ffffff"
                    hoverBorderColor={borderColor}
                    height={buttonHeight}
                    width={buttonWidth}/>
                <Button 
                    icon="fa-solid fa-forward" 
                    iconPosition='right'
                    disabled={currentPage === totalPages}
                    visible={totalPages > 1}
                    onClick={() => onPageChange(currentPage + 1)}
                    textColor="#ffffff"
                    backgroundColor={borderColor}
                    borderColor={borderColor}
                    hoverTextColor={borderColor}
                    hoverBackgroundColor="#ffffff"
                    hoverBorderColor={borderColor}
                    height={buttonHeight}
                    width={buttonWidth}/>
                <Button 
                    icon="fa-solid fa-forward-fast" 
                    iconPosition='right'
                    disabled={currentPage === totalPages}
                    visible={totalPages > 2}
                    onClick={() => onPageChange(totalPages)}
                    textColor="#ffffff"
                    backgroundColor={borderColor}
                    borderColor={borderColor}
                    hoverTextColor={borderColor}
                    hoverBackgroundColor="#ffffff"
                    hoverBorderColor={borderColor}
                    height={buttonHeight}
                    width={buttonWidth}/>
            </Row>
        </div>
    )
}
