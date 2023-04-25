import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Title from './Title';

// Yup validation
const schema = yup.object().shape({
  name: yup
    .string()
    .max(80, 'Please do not exceed the maximum length of 80 characters!')
    .required('Your Full Name is required!'),
  email: yup
    .string()
    .max(80, 'Please do not exceed the maximum length of 80 characters!')
    .email('Please write a valid e-mail address!')
    .required('Your E-mail Address is required!'),
  message: yup
    .string()
    .max(5000, 'Please do not exceed the maximum length of 5000 characters!')
    .required('Please write a message!'),
});
type YupFormData = yup.InferType<typeof schema>;

interface FormValues extends YupFormData {
  access_key: 'access_key';
  botcheck: 'botcheck';
}

export default function ContactMeForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const submitHandler: SubmitHandler<FormValues> = async (data, e) => {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: JSON.stringify(data, null, 2),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await response.json();

      if (json.success) {
        setIsSuccess(true);
        setFeedbackMessage(json.message);
        e?.target.reset();
        reset();
      } else {
        setIsSuccess(false);
        setFeedbackMessage(json.message);
      }
    } catch (err) {
      setIsSuccess(false);
      setFeedbackMessage('Something went wrong.');
      console.error(err);
    }
  };

  return (
    <div id="contact" className="mx-4 mb-14 flex scroll-mt-20 flex-col">
      <div className="flex flex-col items-center justify-center">
        {!isSubmitSuccessful && (
          <>
            <Title>Contact Me</Title>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="flex w-full flex-col text-gray-700 dark:text-gray-400 md:w-2/3 lg:w-1/2"
            >
              {/* Access Key can be public */}
              <input
                type="hidden"
                value="33d94e36-6ff7-4386-b594-46faec075890"
                {...register('access_key')}
              />
              {/* Prevent SPAM Submission */}
              <input
                type="checkbox"
                id=""
                className="hidden"
                style={{ display: 'none' }} // fallback if Tailwind fails
                {...register('botcheck')}
              />
              {/* Name */}
              <p className="text-sm text-red-600">{errors.name?.message}</p>
              <input
                type="text"
                placeholder="Your Full Name"
                className={`my-2 rounded-md border-2 bg-transparent px-4 py-2 focus:outline-none focus:ring-4 focus:ring-offset-2 dark:border-gray-700 dark:placeholder:text-gray-500 ${
                  errors.name
                    ? 'border-red-300 focus:ring-red-200 dark:border-red-500 dark:focus:ring-0'
                    : 'focus:ring-violet-200 dark:focus:ring-gray-700'
                }`}
                {...register('name')}
              />
              {/* Email Address */}
              <p className="text-sm text-red-600">{errors.email?.message}</p>
              <input
                type="text"
                placeholder="Your E-mail Address"
                className={`my-2 rounded-md border-2 bg-transparent px-4 py-2 focus:outline-none focus:ring-4 focus:ring-offset-2 dark:border-gray-700 dark:placeholder:text-gray-500 ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-200 dark:border-red-500 dark:focus:ring-0'
                    : 'focus:ring-violet-200 dark:focus:ring-gray-700'
                }`}
                {...register('email')}
              />
              {/* Message */}
              <p className="text-sm text-red-600">{errors.message?.message}</p>
              <textarea
                placeholder="Write your message..."
                rows={8}
                className={`mb-4 mt-2 rounded-md border-2 bg-transparent px-4 py-2 focus:outline-none focus:ring-4 focus:ring-offset-2 dark:border-gray-700 dark:placeholder:text-gray-500 ${
                  errors.message
                    ? 'border-red-300 focus:ring-red-200 dark:border-red-500 dark:focus:ring-0'
                    : 'focus:ring-violet-200 dark:focus:ring-gray-700'
                }`}
                {...register('message')}
              />
              {/* Submit Button */}
              <div className="flex h-12 w-48 cursor-pointer items-center justify-center self-center rounded-md bg-gradient-to-br from-pink-500 to-violet-700 px-8 py-3 text-base font-medium text-violet-50 drop-shadow-md transition-transform duration-300 hover:scale-105 focus:scale-105 focus:outline-none md:self-start ">
                <button
                  className="focus:underline focus:underline-offset-4 focus:outline-none"
                  type="submit"
                >
                  {isSubmitting ? (
                    <ArrowPathIcon className="h-6 w-6 animate-spin text-violet-50" />
                  ) : (
                    'Contact Me'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
        {/* Feedback Message */}
        {isSubmitSuccessful && isSuccess && (
          <div className="flex w-full flex-col items-center justify-center text-gray-700 md:w-1/2">
            <CheckIcon className="h-16 w-16 animate-pulse text-green-600" />
            <p className="text-sm text-green-600">{feedbackMessage}</p>
          </div>
        )}
        {isSubmitSuccessful && !isSuccess && (
          <div className="flex w-full flex-col items-center justify-center text-gray-700 md:w-1/2">
            <XMarkIcon className="h-16 w-16 animate-pulse text-red-600" />
            <p className="text-sm text-red-600">{feedbackMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
