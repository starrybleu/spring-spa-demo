import io.github.starrybleu.SpringSPA;
import io.github.starrybleu.WebMvcConfiguration;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.CoreMatchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {SpringSPA.class, WebMvcConfiguration.class})
@WebAppConfiguration
public class SpringSPATests {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    private static final String ROOT_URI = "/";
    private static final String FORWARDED_TO_ROOT = "forward:/";

    @Before
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .build();
    }

    @Test
    public void root_request_to_this_application_should_return_index() throws Exception {
        mvc.perform(get(ROOT_URI))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("text/html;charset=UTF-8"))
                .andExpect(view().name("index"))
                .andExpect(content().string(containsString("SPA")));
    }

    @Test
    public void any_requests_to_this_application_should_forward_to_index() throws Exception {
        String anyUri = ROOT_URI + "anyUri_ABCDEFG";

        mvc.perform(get(anyUri))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(view().name(FORWARDED_TO_ROOT))
                .andExpect(forwardedUrl(ROOT_URI));
    }

}
