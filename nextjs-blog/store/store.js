const store = configureStore({
  reducer: {
    // add your slice reducers here
    user: userSlice,
    course: courseSlice,
    lesson: lessonSlice,
    review: reviewSlice,
    notebook: notebookSlice,
  },
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
