const MethodsEmptyState = () => (
  <>
    <h1 className="mb-12 text-3xl font-bold text-center text-gray-600">You don&apos;t have any methods yet</h1>
    <div className="flex flex-row flex-wrap justify-center ring-gray-200">
      <div className="flex justify-center w-full px-6 mb-8 lg:justify-end lg:w-1/2 lg:mb-0">
        <button type="button" className="flex items-center justify-center w-full max-w-md py-20 text-xl border-2 border-gray-200 border-dashed rounded-xl">
          + Create
        </button>
      </div>
      <div className="flex justify-center w-full px-6 lg:justify-start lg:w-1/2">
        <button type="button" className="flex items-center justify-center w-full max-w-md py-20 text-xl border-2 border-gray-200 border-dashed rounded-xl">
          + Lookup
        </button>
      </div>
    </div>
  </>
);

export default MethodsEmptyState;
