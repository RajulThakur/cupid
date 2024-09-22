import { Avatar } from "@mui/material";

function Direct() {
  return (
    <div className="flex h-svh flex-col py-2">
      <nav>
        <Avatar />
      </nav>
      <div className="flex flex-1 flex-col gap-7 overflow-y-scroll">
        {/* Me */}
        <div className="flex justify-end gap-3">
          <div className="w-auto max-w-xs rounded-l-2xl rounded-tr-2xl bg-accent-tint-0 px-4 py-3 text-base">
            <p className="font-semibold text-accent-shade-900">You</p>
            <div className="max-h-auto pr-4 text-base leading-snug text-accent-shade-1000">
              Okay, then let's divide the presentation into a few main sections:
              introduction, product description, features and benefits, use
              cases, and conclusion. Okay, then let's divide the presentation
              into a few main sections: introduction, product description,
              features and benefits, use cases, and conclusion.Okay, then let's
              divide the presentation into a few main sections: introduction,
              product description, features and benefits, use cases, and
              conclusion.Okay, then divid
            </div>
            <p className="-mt-2 text-right text-accent-shade-400">8:36PM</p>
          </div>

          <div className="self-end">
            <Avatar sx={{ height: "45px", width: "45px" }} />
          </div>
        </div>

        {/* Other */}
        <div className="flex justify-start gap-3">
          <div className="self-end">
            <Avatar sx={{ height: "45px", width: "45px" }} />
          </div>
          <div className="w-auto max-w-xs rounded-l-2xl rounded-tr-2xl bg-foreground px-4 py-3 text-base">
            <p className="font-semibold text-accent-tint-0">Priyanka</p>
            <div className="max-h-auto pr-4 text-base leading-snug text-background">
              Okay, then let's divide the presentation into a few main sections:
              introduction, product description, features and benefits, use
              cases, and conclusion. Okay, then let's divide the presentation
              into a few main sections: introduction, product description,
              features and benefits, use cases, and conclusion.Okay, then let's
              divide the presentation into a few main sections: introduction,
              product description, features and benefits, use cases, and
              conclusion.Okay, then divid
            </div>
            <p className="-mt-2 text-right text-accent-shade-400">8:36PM</p>
          </div>
        </div>
      </div>

      <textarea
        className="h-10 resize-none overflow-y-scroll px-8 py-2 focus:outline-none"
        placeholder="Type your message..."
        rows="1"
        maxLength="1000"
      />
    </div>
  );
}

export default Direct;
