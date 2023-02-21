# jest.fn - Mock Function

- res.json = jest.fn()
expect(res.json).toBeCalledWith({isErr: false,data: ['mockMemoArr']errMess:null})

* Mock Function used to testing a function that contains a function (Mock function name is Predicate)
* function in function



# jest.mock() - Mock Module
- import { routes } from "../routes/routes";
jest.mock("../routes/routes");
await (routes.formidable_promise as jest.Mock).mockReturnValue({})
await (routes.transfer_formidable_into_obj as jest.Mock).mockReturnValue({})

* Manual Mock module used to testing a function in module
* function in module




# jest.spyOn

const john = new Person(15);
const peter = new Person(20);
const johnSpy = jest.spyOn(john, "drink");
const peterSpy = jest.spyOn(peter, "drink");

drink are john class and peter class method    

    expect(johnSpy).not.toBeCalled();
    expect(peterSpy).toBeCalled();
  

* Mock SpyOn used to testing parameter for function(parameter) or new class(parameter)
* parameter in new class or function

  