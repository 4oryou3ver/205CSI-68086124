"use client";

import { useEffect, useState } from "react";

import { Toggle } from "@/components/tailgrids/core/toggle";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/tailgrids/core/native-select";

import {
  TableRoot,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/tailgrids/core/table";

import { Pagination } from "@/components/tailgrids/core/pagination";
import { Spinner } from "@/components/tailgrids/core/spinner";
import { Button } from "@/components/tailgrids/core/button";
import { Plus, Trash1, ClockThree, Check } from "@tailgrids/icons";

import { fetchTodos } from "@/data/todos";
import type { TodoType } from "@/data/todos";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/tailgrids/core/dialog";
import { Input } from "@/components/tailgrids/core/input";
import { Label } from "@/components/tailgrids/core/label";
import { Backdrop, OverlayWrapper } from "@/components/tailgrids/core/overlay";
import { TextArea } from "@/components/tailgrids/core/text-area";
import { TextField } from "@/components/tailgrids/core/text-field";
import { useRouter } from "next/navigation";
import { checkLogin } from "@/utils/login";


export default function Page() {
  const router = useRouter()
        useEffect(() => checkLogin(router, '/todos'),[router])

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todosRaw, setTodosRaw] = useState<TodoType[]>([]);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [onlyWaiting, setOnlyWaiting] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [showDialog, setShowDialog] = useState<boolean>(false)

  // onload จาก localStorage
  useEffect(() => {
    const _todoRawStr = localStorage.getItem('todosRaw')
    if (_todoRawStr === null) {
      // setTodosRaw([])
      fetchTodos()
      .then(data => setTodosRaw(data as TodoType[]))
      .catch(() => setTodosRaw([]))
      .finally(() => setIsLoading(false))
    } else {
      setTodosRaw(JSON.parse(_todoRawStr) as TodoType[])
    }
    setIsLoading(false)
  }, [])

  // บันทึกลง localStorage ทุกครั้งที่ todosRaw เปลี่ยน
  useEffect(() => {
    localStorage.setItem('todosRaw', JSON.stringify(todosRaw))
  }, [todosRaw])


  // //onload
  // useEffect(() => {
  //   fetchTodos()
  //     .then((data) => setTodosRaw(data as TodoType[]))

  //     .catch((error) => setTodosRaw([]))
  //     .finally(() => setIsLoading(false));
  // }, []);

  // todoRaw, onlyWaiting => [] => todos
  useEffect(() => {
    onlyWaiting
      ? setTodos(todosRaw.filter((todo) => todo.completed === false))
      : setTodos(todosRaw);
  }, [todosRaw, onlyWaiting]);

  // todos, itemsPerPage => [] => totalPerPage

  useEffect(() => {
    // console.log(itemsPerPage)
    setTotalPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);

  // totalPages => [] => currenPage
  useEffect(() => {
    if (totalPages > 0) {
      if (currentPage <= 0) setCurrentPage(1);
      else if (currentPage > totalPages) setCurrentPage(totalPages);
    }
  }, [totalPages]);

  // delete
  const deleteTodo = (id: number) => {
   setTodosRaw(todosRaw.filter
  ((todo) => todo.id !== id ))
 }
  // makeDone
  const makeDone = (id: number) => {
    // console.log(`make done ...(${id})`)
    // pointer 'selected
  const selected = todosRaw.find((todo) => {
       return todo.id === id
      })
      //edit not update
      selected!.completed = true
      console.log(selected)
      
      //update
      setTodosRaw([... todosRaw ])


  }

// add new todo
const addTodo = () => {
  const idDom = document.getElementById('id') as HTMLInputElement
  const titleDom = document.getElementById('title') as HTMLInputElement

  //validate
 const titleStr = titleDom.value.trim()
 if(titleStr === '') return

 // new todo
  const newTodo: TodoType = {
    userId: 1,
    id: Number(idDom.value),
    title: titleDom.value.trim(),
    completed: false
  }
  // add to todosRaw
  setTodosRaw([...todosRaw, newTodo])
}

 
  return (
    <>
    <div className="mt-8 max-w-3xl w-full mx-auto px-4 font-sans">
      {/* 1. Controller ด้านบน */}
      <div className="flex justify-between items-center mb-3">
        {/* Toggle + ป้าย Waiting สีเหลืองตัวหนังสือสีขาว */}
        <div className="flex items-center gap-2.5">
          <Toggle
            label="Show only"
            checked={onlyWaiting}
            onChange={(e) => setOnlyWaiting(e.target.checked)}
          />
          &nbsp;
          <Button
            size="sm"
            className="h-8 p-2 bg-yellow-500 pointer-evensts-none"
          >
            Waiting
            <ClockThree />
          </Button>
          {/* <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f0a500] px-3 py-1 text-xs font-medium text-white shadow-xs">
            Waiting
            <ClockThree size={14} className="text-white" />
          </span> */}
        </div>

        {/* Dropdown 50 items per page */}
        <div className="w-[185px]">
          <NativeSelect
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <NativeSelectOption value="5">5 items per page</NativeSelectOption>
            <NativeSelectOption value="10">
              10 items per page
            </NativeSelectOption>
            <NativeSelectOption value="50">
              50 items per page
            </NativeSelectOption>
          </NativeSelect>
        </div>
      </div>

      {/* 2. ตารางข้อมูล */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
  <TableRoot className="w-full text-left border-collapse">
    {/* หัวตารางพื้นหลังสีดำสนิท */}
    <TableHeader>
      <TableRow className="bg-[#111315] border-none text-white">
        <TableHead className="font-bold py-3.5 px-6 w-28">
          ID
        </TableHead>
        
        {/* กำหนดให้คอลัมน์นี้ขยายเต็มพื้นที่ตรงกลาง และจัดข้อความให้อยู่กึ่งกลาง */}
        <TableHead className="font-bold py-3.5 px-4 text-center w-full">
          <div className="w-full text-center">
            Title
          </div>
        </TableHead>

        <TableHead className="font-bold py-3.5 px-6 text-right whitespace-nowrap">
          <div className="flex items-center justify-end gap-2">
            Completed
            <Button variant={'primary'} className='h-8 p-2' 
            onClick={() => setShowDialog(true)}>
              <Plus />
            </Button>
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
          {/* รายการแถวในตาราง */}

          <TableBody className="divide-y divide-gray-100">
            {/* show spinner while loading */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Spinner className="mx-auto" />
                </TableCell>
              </TableRow>
            )}

            {!isLoading && todos.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-red-500">
                  No data, may be connection refused (refetch again)
                </TableCell>
              </TableRow>
            )}

            {/* render data  */}
            {todos.filter((todo, index) => {
              const lower = (currentPage - 1) * itemsPerPage 
              const upper = (currentPage ) * itemsPerPage - 1
              return index  >= lower && index <= upper })
            .map((todo) => {
              return (
                <TableRow key={todo.id}>
                  <TableCell className="py-4 px-6 align-middle">
                    <span className="inline-flex items-center justify-center min-w-[48px] px-2.5 py-1 rounded-lg bg-[#5c6470] text-white text-xs font-bold">
                      {todo.id}
                    </span>
                  </TableCell>

                  <TableCell className="py-4 px-4 text-gray-500 font-normal text-sm align-middle">
                    {todo.title}
                  </TableCell>

                  <TableCell className="py-4 px-6 text-right align-middle">
                    <div className="flex items-center justify-end gap-2">
                      {todo.completed ? (
                        <Button
                          size="sm"
                          className="h-8 p-2 bg-green-700  size={14}  text-white pointer-evensts-none"
                        >
                          Done
                          <Check />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="h-8 p-2 bg-yellow-500 pointer-evensts-none"
                          onClick={() => makeDone(todo.id)}
                        >
                          Waiting
                          <ClockThree />
                        </Button>
                      )}

                      <Button
                       size="sm"
                        variant='danger' className='h-8 p-2'
                        onClick={() => deleteTodo(todo.id)}
                       
                      >
                        <Trash1  />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            {/* แถวที่ 1 (ID: 12) */}
            {/* copleted = false */}
            {/* <TableRow>
              <TableCell className="py-4 px-6 align-middle">
                <span className="inline-flex items-center justify-center min-w-[48px] px-2.5 py-1 rounded-lg bg-[#5c6470] text-white text-xs font-bold">
                  12
                </span>
              </TableCell>

              <TableCell className="py-4 px-4 text-gray-500 font-normal text-sm align-middle">
                Lorem ipsum dolor.
              </TableCell>

              <TableCell className="py-4 px-6 text-right align-middle">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="sm"
                    className="h-8 p-2 bg-yellow-500 pointer-evensts-none"
                  >
                    Waiting
                    <ClockThree />
                  </Button>

                  <Button
                    appearance="fill"
                    variant="danger"
                    size="sm"
                    className="!bg-[#dc3545] hover:!bg-red-700 !p-2 !rounded-lg text-white"
                    aria-label="Delete todo"
                  >
                    <Trash1 size={15} />
                  </Button>
                </div>
              </TableCell>
            </TableRow> */}

            {/* แถวที่ 2 (ID: 1234) */}
            {/* completed = true */}
            {/* <TableRow>
              <TableCell className="py-4 px-6 align-middle">
                <span className="inline-flex items-center justify-center min-w-[48px] px-2.5 py-1 rounded-lg bg-[#5c6470] text-white text-xs font-bold">
                  1234
                </span>
              </TableCell>

              <TableCell className="py-4 px-4 text-gray-500 font-normal text-sm align-middle">
                Lorem ipsum dolor.
              </TableCell>

              <TableCell className="py-4 px-6 text-right align-middle">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="sm"
                    className="h-8 p-2 bg-green-700  size={14}  text-white pointer-evensts-none"
                  >
                    Done
                    <Check />
                  </Button>

                  <Button
                    appearance="fill"
                    variant="danger"
                    size="sm"
                    className="!bg-[#dc3545] hover:!bg-red-700 !p-2 !rounded-lg text-white"
                    aria-label="Delete todo"
                  >
                    <Trash1 size={15} />
                  </Button>
                </div>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </TableRoot>
      </div>

      {/* pagination */}
      {todos.length > 0 && (
        <div className="mt-2 w-1/3  p-1 mx-auto flex justify-center items-center gap-2 ">
          <Button
            size="sm"
            appearance="outline"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </Button>
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              sideLayout="icon"
            />
          </div>
          <Button
            size="sm"
            appearance="outline"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </Button>
        </div>
      )}
    </div>
  

  <Backdrop isOpen={showDialog} onOpenChange={setShowDialog}>

        <Dialog >
          <DialogHeader>
            <DialogTitle className='flex item-center text-xl gap-2'>New Todo 
              <Plus className='bg-blue-100 rounded-md' size={32} />
              </DialogTitle>
          </DialogHeader>

          <DialogBody>
            <form className="flex flex-col gap-4">
              <TextField className="flex flex-col gap-1.5">
                <Label className="font-bold">ID (auto)</Label>
                <Input
                  id='id'
                  className='w-full pointer-events-none bg-gray-100 text-gray-400' 
                  value = { todosRaw.reduce((p, t) => 
                    ( t.id > p ? t.id : p)

                  ,
                     0 ) +1 }

                  
                />
              </TextField>

              <TextField className="flex flex-col gap-1.5">
                <Label className="font-bold" >Title</Label>
                <Input
                  placeholder="ใส่งานที่ต้องการเพิ่ม"
                  className="w-full"
                  autoFocus
                  id='title'
                />
              </TextField> 
            </form>
          </DialogBody>

          <DialogFooter>
            <DialogClose appearance="outline" >Cancel</DialogClose>
            <DialogClose onClick={() => addTodo()}>Add todo</DialogClose>
          </DialogFooter>
        </Dialog>
      </Backdrop>
      </>
);}
