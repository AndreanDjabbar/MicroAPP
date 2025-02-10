import InsertEmployeePage from './components/pages/InsertEmployeePage'
import ShowEmployeePage from './components/pages/ShowEmployeePage'
import InsertFeedbackPage from './components/pages/InsertFeedbackPage'
import ShowFeedbackPage from './components/pages/ShowFeedbackPage'

const App = () => {
  return (
    <div className='bg-gradient-to-tl from-amber-500 to-sky-600 p-4 flex flex-col gap-3'>
      <InsertEmployeePage></InsertEmployeePage>
      <ShowEmployeePage></ShowEmployeePage>
      <InsertFeedbackPage></InsertFeedbackPage>
      <ShowFeedbackPage></ShowFeedbackPage>
    </div>
  )
}

export default App