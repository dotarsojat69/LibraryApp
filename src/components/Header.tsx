import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import logo from "@/assets/logo_buku.svg"
import { Input } from "./ui/input"
import { HiOutlineMagnifyingGlass } from "react-icons/hi2"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useToken } from "@/utils/context/token"
import { useTheme } from "@/utils/context/theme"
import Cart from "./cart"
import { ShoppingBasket } from "lucide-react"


const Header = () => {
    const { token, user, changeToken } = useToken();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  

  function handleLogout() {
    changeToken();
    toast(
      "Logout Successfully",
    );
  }

  return (
    <header className="flex sticky items-center top-0 bg-white/60 dark:bg-black/50 z-20 p-1.5">
      <Link to="/">
      <img src={logo} width={150} height={150} className="hidden p-1 mx-1 sm:block"/>
      </Link>
      <div className="flex p-2 w-full mx-5 rounded-full items-center gap-4">
        <HiOutlineMagnifyingGlass />
        <Input type="text" placeholder= "Search books..." className="outline-none bg-transparent" />
        {token && user.role === "user" && (
          <Cart>
            <ShoppingBasket/>
          </Cart>
        )}
      
      <DropdownMenu>
            <DropdownMenuTrigger>
      <Avatar>
  <AvatarImage src={user.profile_picture} alt={user.full_name} />
  <AvatarFallback className="text-bold">LA</AvatarFallback>
</Avatar>
</DropdownMenuTrigger>
<DropdownMenuContent className="w-40" align="start" forceMount>
              {token && (
                <>
                  <DropdownMenuLabel>Hi! {user.full_name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  {user.role === "user" ? (
                    <DropdownMenuItem
                      onClick={() => navigate("/history-borrow")}
                    >
                      My Books
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </DropdownMenuItem>
                  )}
                </>
              )}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              {token ? (
                <DropdownMenuItem onClick={() => handleLogout()}>
                  Logout
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => navigate("/login")}>
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/register")}>
                    Register
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
    </header>
  )
}

export default Header
