'use client'
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
    useUploadCategoryImageMutation,
    useGetProductImageQuery,
    useGetCategoryImageQuery
} from "@/redux/service/product";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, {useState, useRef} from "react";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { Button, Modal, TextInput } from "flowbite-react";
import Loading from "@/app/(user)/loading";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {data} from "@formatjs/intl-localematcher/abstract/languageMatching";
import {selectToken} from "@/redux/features/auth/authSlice";

// Define your Yup validation schema
const validationSchema = Yup.object().shape({
    // Define your validation schema here
});

// Component for creating a new product
const FormCreateProduct = () => {
    // Destructure the mutation function from the hook
    const [createProduct] = useCreateProductMutation();
    const [uploadProductImage] = useUploadProductImageMutation();
    const [uploadCategoryImage] = useUploadCategoryImageMutation();
    const {data: productImages, isLoading: isProductImagesLoading} = useGetProductImageQuery({page: 1, pageSize: 10});
    const proImages = productImages?.results;
    const {data: categoryImages, isLoading: isCategoryImagesLoading} = useGetCategoryImageQuery({page: 1, pageSize: 10});
    const cateImages = categoryImages?.results;
    // Access token from Redux store
    const accessToken = useAppSelector(selectToken);
    const fieldStyle = "border border-gray-300 rounded-md";
    const [openModal, setOpenModal] = useState(false);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openProductModal, setOpenProductModal] = useState(false);


    // Function to handle form submission
    const handleSubmit = async (values: {
        category: { name: any; icon: any; };
        name: any;
        desc: any;
        image: any;
        price: any;
        quantity: any;
    }, {
                                    setSubmitting,
                                    resetForm
                                }: any) => {
        try {

            // Upload product image
            const productImageResponse = await uploadProductImage(values.image);
            // @ts-ignore
            const productImageUrl = productImageResponse.data.url;

            // Upload category image
            const categoryImageResponse = await uploadCategoryImage(values.category.icon);
            // @ts-ignore
            const categoryImageUrl = categoryImageResponse.data.url;
            // Make the API call to create a new product
            await createProduct({
                newProduct: {
                    category: {
                        name: values.category.name,
                        icon: categoryImageUrl,
                    },
                    name: values.name,
                    desc: values.desc,
                    image: productImageUrl,
                    price: values.price,
                    quantity: values.quantity,
                },
                accessToken: `${accessToken}`, // Provide the access token
            });

            // Reset the form after successful submission
            resetForm();
        } catch (error) {
            console.error("Error creating product:", error);
        } finally {
            // Reset the submitting state
            setSubmitting(false);
        }
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className="w-[700px] mx-auto h-[1000px]">
            <Formik
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                initialValues={{
                    category: {
                        name: "",
                        icon: undefined, // Changed to undefined for initial value
                    },
                    name: "",
                    desc: "",
                    image: undefined, // Changed to undefined for initial value
                    price: 0,
                    quantity: 0,
                }}
            >
                {({isSubmitting, setFieldValue}) => (
                    <Form className="flex m-[30px] flex-col gap-4">
                        {/* name */}
                        {/* Category Name */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="category.name">Category Name:</label>
                            <Field
                                placeholder="Category name"
                                className={fieldStyle}
                                name="category.name"
                                type="text"
                            />
                            <ErrorMessage name="category.name"/>
                        </div>
                        {/* Category Icon*/}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Product Name: </label>
                            <Field
                                placeholder="Your product name"
                                className={fieldStyle}
                                name="name"
                                type="text"
                            />
                            {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}
                        </div>
                        {/* description */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="desc">Description: </label>
                            <Field
                                placeholder="Your product description"
                                className={fieldStyle}
                                name="desc"
                                type="text"
                            />
                            {/* <ErrorMessage name="email">
                {(msg) => <p className="text-red-600 text-sm italic">{msg}</p>}
              </ErrorMessage> */}
                        </div>
                        {/* price */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="price">Price: </label>
                            <Field
                                placeholder="$0"
                                className={fieldStyle}
                                name="price"
                                type="number"
                            />
                        </div>
                        {/*quantity*/}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="price">Quantity: </label>
                            <Field
                                placeholder="1"
                                className={fieldStyle}
                                name="quantity"
                                type="number"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="category.icon">Category Icon:</label>
                            <input
                                name="category.icon"
                                type="file"
                                accept="image/*" // Accept only image files
                                onChange={(event) => {
                                    // @ts-ignore
                                    setFieldValue("category.icon", event.currentTarget.files[0]);
                                }}
                            />
                            <ErrorMessage name="category.icon"/>
                        </div>
                        <Button className={`w-max`} onClick={() => setOpenCategoryModal(true)}>Select category image</Button>
                        <Modal show={openCategoryModal} size="md" popup onClose={() => setOpenCategoryModal(false)} initialFocus={emailInputRef}>
                            <Modal.Header/>
                            <Modal.Body>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Category
                                        Images</h3>
                                    {isCategoryImagesLoading ? (
                                        <div>Loading...</div>
                                    ) : cateImages ? (
                                        <div className="flex flex-col gap-4">
                                            {cateImages.map((image: { id: React.Key | null | undefined; image: string | StaticImport; name: string; }) => (
                                                // eslint-disable-next-line react/jsx-key
                                                <button className={`p-2 hover:bg-gray-100 rounded-md`}>
                                                    <div className={`flex justify-between items-center`}>
                                                        <Image
                                                            height={300}
                                                            width={300}
                                                            key={image.id}
                                                            src={image.image}
                                                            alt={image.name}
                                                            className="w-[40px] h-auto"
                                                        />
                                                        <p className={`text-[12px]`}>{image.name}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div>No category images available</div>
                                    )}
                                </div>
                            </Modal.Body>
                        </Modal>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="image">Product Image:</label>
                            <input
                                name="image"
                                type="file"
                                accept="image/*" // Accept only image files
                                onChange={(event) => {
                                    // @ts-ignore
                                    setFieldValue("image", event.currentTarget.files[0]);
                                }}
                            />
                            <ErrorMessage name="image"/>
                        </div>
                        <Button className={`w-max`} onClick={() => setOpenProductModal(true)}>Select product image</Button>
                        <Modal show={openProductModal} size="md" popup onClose={() => setOpenProductModal(false)} initialFocus={emailInputRef}>
                            <Modal.Header/>
                            <Modal.Body>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Product
                                        Images</h3>
                                    {isProductImagesLoading ? (
                                        <div>Loading...</div>
                                    ) : proImages ? (
                                        <div className="flex flex-col gap-4">
                                            {proImages.map((image: { id: React.Key | null | undefined; image: string | StaticImport; name: string; }) => (
                                                // eslint-disable-next-line react/jsx-key
                                                <button className={`p-2 hover:bg-gray-100 rounded-md`}>
                                                    <div className={`flex justify-between items-center`}>
                                                        <Image
                                                            height={300}
                                                            width={300}
                                                            key={image.id}
                                                            src={image.image}
                                                            alt={image.name}
                                                            className="w-[40px] h-auto"
                                                        />
                                                        <p className={`text-[12px]`}>{image.name}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div>No product images available</div>
                                    )}
                                </div>
                            </Modal.Body>
                        </Modal>
                        <button
                            type="submit"
                            className="w-max px-4 font-semibold text-sm py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                            disabled={isSubmitting} // Disable the button while submitting
                        >
                            {isSubmitting ? "Creating..." : "Create"}
                        </button>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormCreateProduct;

function CustomInput({field, form, setFieldValue, ...props}: any) {
    const [previewImage, setPreviewImage] = useState<string | undefined>(
        undefined
    );
    const name = field.name;
    const onChange: any = (event: any) => {
        console.log("event:", event.currentTarget.files);
        const file = event.currentTarget.files[0];
        setFieldValue(name, file);
        setPreviewImage(URL.createObjectURL(file));
    };

    return (
        <div className="flex flex-col gap-4 justify-center">
            <input
                type="file"
                onChange={onChange}
                {...props}
                className="border border-gray-300 rounded-md"
            />
            {previewImage && (
                <Image
                    className="rounded-md"
                    src={previewImage}
                    alt="preview Image"
                    width={100}
                    height={100}
                />
            )}
        </div>
    );
}
