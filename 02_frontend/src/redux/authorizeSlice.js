import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  student_id: null,
  teacher_id: null,
  classroom_id: null,
  name: null,
  register_flag: null
}

const authorizeSlice = createSlice({
  name: 'authorize',
  initialState,
  reducers: {
    login: (state, action) => {
      state.student_id = action.payload.id
      state.teacher_id = action.payload.teacher_id
      state.classroom_id = action.payload.classroom_id
      state.name = action.payload.name
      state.register_flag = action.payload.register_flag
    },
    logout : (state) => {
      state.studentId = null
      state.teacherId = null
      state.classroomId = null
      state.name = null
      state.registerFlag = null
    },
    finishiRegister : (state) => {
      state.register_flag = 1
    }
  }
})

export const { login, logout, finishiRegister } = authorizeSlice.actions
export default authorizeSlice.reducer