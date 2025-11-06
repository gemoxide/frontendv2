import { toast } from "react-toastify";
import SignaturePad from "../../../../core/components/SignaturePad";
import { updateUserSignatureRequest } from "../../../../core/services/auth/auth.service";

const Signature = () => {
  const handleSaveImage = async (dataUrl: string) => {
    try {
      const { data } = await updateUserSignatureRequest(dataUrl);
      if (data) {
        toast.success("Signature updated successfully");
      }
      console.log(data);
    } catch (error) {
      toast.error("Failed to update signature");
    }
  };
  return (
    <div className="w-full bg-white rounded-lg p-8 shadow-lg space-y-4">
      <h1 className="text-2xl font-extrabold text-secondary">Signature</h1>
      <SignaturePad onSaveImage={handleSaveImage} />
    </div>
  );
};

export default Signature;
