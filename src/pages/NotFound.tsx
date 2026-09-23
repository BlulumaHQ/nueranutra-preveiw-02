import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleProvider";

const NotFound = () => {
  const { t, lp } = useLocale();
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.notFound.body}</p>
        <Link to={lp("/")} className="text-primary underline hover:text-primary/90">
          {t.notFound.back}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
