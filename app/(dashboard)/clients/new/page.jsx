"use client"
import React from 'react';
import { Button, TextField, IconButton, Avatar, Rating, Divider } from '@mui/material';
import { useState } from 'react';
import { BoxSelect, BoxSelectIcon, CameraIcon, Delete, Divide, Plus, PlusIcon, Trash2 } from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';

export default function Page() {
  const [rating, setRating] = useState(0);

  return (
    <div className='max-w-[1200px] mx-auto space-y-4'>
      <div className='text-sm text-tprimary'>
        Back to : <Link href={"/quotes"} className='text-green-700'>Clients</Link>
      </div>
      {/* Header */}
      <div className="flex justify-start items-center mb-6">
        <div className="text-4xl font-semibold text-tprimary">New Client</div>
      </div>

      <div className="p-8 border border-gray-200 rounded-xl border-t-8 border-t-pink-950">
      </div>
    </div>
  );
}
