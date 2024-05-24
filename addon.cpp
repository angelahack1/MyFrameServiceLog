#include <node.h>

namespace addon {
    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Number;
    using v8::Object;
    using v8::Value;

    void Add(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        int64_t value1 = 0;
        int64_t value2 = 0;

        args[0]->IntegerValue(isolate->GetCurrentContext()).To(&value1);
        args[1]->IntegerValue(isolate->GetCurrentContext()).To(&value2);
        int64_t result = value1 + value2;
        Local<Number> num = Number::New(isolate, result);

        args.GetReturnValue().Set(num);
    }

    void Initialize(Local<Object> exports) {
        NODE_SET_METHOD(exports, "add", Add);
    }

    NODE_MODULE(addon, Initialize)
}