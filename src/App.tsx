import styles from "./form.module.css"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react"

const schema = yup
  .object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup
      .string()
      .required("O e-mail é obrigatório")
      .email("E-mail inválido"),
    password: yup
      .string()
      .required("A senha é obrigatória")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: yup
      .string()
      .required("A confirmação de senha é obrigatória")
      .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
  })
  .required()

interface FormData {
  name: string
  email: string
  password: string
}

function App() {
  const [isSuccess, setIsSucess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    setIsSucess(true)
  }

  return (
    <form className={styles.contentForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <input
          {...register("name")}
          type="text"
          placeholder="Insira seu nome"
          className={errors.name ? styles.inputError : ""}
        />
        <span className={errors.name ? styles.labelError : ""}>
          {errors.name?.message}
        </span>
      </div>
      <div className={styles.formGroup}>
        <input
          {...register("email")}
          type="email"
          placeholder="Insira seu e-mail"
          className={errors.email ? styles.inputError : ""}
        />
        <span className={errors.email ? styles.labelError : ""}>
          {errors.email?.message}
        </span>
      </div>
      <div className={styles.formGroup}>
        <input
          {...register("password")}
          type="password"
          placeholder="Insira sua senha"
          className={errors.password ? styles.inputError : ""}
        />
        <span className={errors.password ? styles.labelError : ""}>
          {errors.password?.message}
        </span>
      </div>
      <div className={styles.formGroup}>
        <input
          type="password"
          placeholder="Confirmar sua senha"
          {...register("confirmPassword")}
          className={errors.confirmPassword ? styles.inputError : ""}
        />
        <span className={errors.confirmPassword ? styles.labelError : ""}>
          {errors.confirmPassword?.message}
        </span>
      </div>

      <button type="submit">Enviar formulário</button>

      {isSuccess && (
        <div>
          <p className={styles.labelSuccess}>Formulário enviado com sucesso!</p>
        </div>
      )}
    </form>
  )
}

export default App
