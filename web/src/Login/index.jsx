import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const Input = props => (
  <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus: border-platinum"/>
 )

const validationSchema = yup.object({
  email: yup.string().required('Introduza o seu email').email('Email inválido'),
  password: yup.string().required('Introduza a sua senha')
})

export function Login({ signInUser }) {
  const formik = useFormik({
    onSubmit: async values => {
      const res = await axios.get('http://localhost:9901/login', {
        auth: {
          username: values.email,
          password: values.password
        }
      })
      console.log(res)
      signInUser(res.data)
    },
    initialValues: {
      email: '',
      password: ''
    },
    validateOnMount: true,
    validationSchema
  })
  return (
    <div className="flex flex-wrap items-center justify-center min-h-screen">
      <div className="space-y-8 p-10">
        <h1 className="text-3xl text-center">Aceda à sua conta</h1>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {(formik.touched.email && formik.errors.email) && (
            <span className="text-red-500 text-sm">{formik.errors.email}</span>
          )}
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {(formik.touched.password && formik.errors.password) && (
            <span className="text-red-500 text-sm">{formik.errors.password}</span>
          )}
          <button
            className="bg-blue w-full py-3 rounded-full disabled:opacity-50 text-lg"
            disabled={formik.isSubmitting || !formik.isValid}
            type="submit"
          >
          {formik.isSubmitting ? 'A entrar...' : 'Entrar'}
          </button>
        </form>
        <span className="block text-sm text-silver text-center">
          Não tem conta? <a className="text-blue" href="">Registar</a>
        </span>
      </div>
    </div>
  )
}