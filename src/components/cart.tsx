import { ReactNode, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { postBorrow } from "@/utils/apis/borrows";
import useBorrowStore from "@/utils/state";

interface Props {
  children: ReactNode;
}

const Cart = (props: Props) => {
  const { children } = props;
  const cart = useBorrowStore((state) => state.cart);
  const removeBook = useBorrowStore((state) => state.removeBook);
  const clearCart = useBorrowStore((state) => state.clearCart);
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleTabClose = (event: BeforeUnloadEvent) => {
      if (cart.length > 0) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [cart]);

  async function onBorrow() {
    try {
      const body = {
        bookId: cart.map((cart) => cart.id),
        borrow_date: new Date().toISOString(),
      };

      const result = await postBorrow(body);
      toast({
        description: result.message,
      });
      clearCart();
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            This is your list of books that you want to borrow
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4 w-full overflow-auto">
          {cart.map((book) => (
            <div className="flex gap-2 items-center" key={book.id}>
              <img
                className="object-contain w-1/4"
                src={book.cover_image}
                alt={book.title}
              />
              <p className="flex-grow">{book.title}</p>
              <Trash2 onClick={() => removeBook(book)} />
            </div>
          ))}
        </div>
        <SheetFooter>
          <Button
            onClick={() => onBorrow()}
            disabled={cart.length === 0}
            aria-disabled={cart.length === 0}
          >
            Borrow
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;