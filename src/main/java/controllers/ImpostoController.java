package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import services.interfaces.IImpostoServices;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/Impostos")
public class ImpostoController {

    @Autowired
    private IImpostoServices impostoServices;

    @GetMapping
    public ModelAndView index()throws Exception{
        try {
            ModelAndView modelAndView = new ModelAndView("impostos/index");
            modelAndView.addObject("impostos", impostoServices.getAll());
            return modelAndView;
        }catch (Exception ex){
            throw new Exception(ex.getMessage());
        }
    }
}
