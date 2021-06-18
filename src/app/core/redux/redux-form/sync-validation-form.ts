export const validate = (values: any) => {
    const errors = {} as any
    if (!values.title) {
        errors.title = 'Required'
    } else if (values.title.length > 10) {
        errors.title = 'Must be 10 characters or less'
    }
    return errors
}
